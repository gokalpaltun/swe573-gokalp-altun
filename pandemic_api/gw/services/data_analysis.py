from operator import itemgetter
from .search import SearchService
import numpy as np
import pandas as pd
import requests
import networkx as nx
from networkx.readwrite import json_graph
import os
import json
import boto3
from decouple import config
import string
import re
from nltk.tokenize import TweetTokenizer
import emoji
RECURSION = 25
MAX_RESULT = 100


class DataAnalysisService:
    action_taker_ids = []
    action_takers = []
    tweet_ids = []
    creator_ids = []
    creators = []
    tweet_texts_relation = []

    tweet_ids_meta = []
    like_counts = []
    quote_counts = []
    reply_counts = []
    retweet_counts = []
    tweet_texts = []
    tweet_authors_meta_ids = []
    tweet_authors_meta_usernames = []

    def __init__(self, user, query) -> None:
        super().__init__()
        self.user = user
        self.query = query
        self.search_service = SearchService()
        self.action_taker_ids = []
        self.action_takers = []
        self.tweet_ids = []
        self.creator_ids = []
        self.creators = []
        self.tweet_texts_relation = []
        self.tweet_ids_meta = []
        self.like_counts = []
        self.quote_counts = []
        self.reply_counts = []
        self.retweet_counts = []
        self.tweet_texts = []
        self.tweet_authors_meta_ids = []
        self.tweet_authors_meta_usernames = []


    def prep_data_with_response(self, response):
        users = response["includes"]["users"]
        referenced_tweets = response["includes"]["tweets"]
        for data in response["data"]:
            if("referenced_tweets" in data):
                try:
                    action_taker_author_id = data["author_id"]
                    referenced_tweet_id = data["referenced_tweets"][0]["id"]
                    action_taker_author = [item for item in users if item.get(
                        'id') == action_taker_author_id][0]
                    tweet = [item for item in referenced_tweets if item.get(
                        'id') == referenced_tweet_id][0]
                    ancestor_tweet_id = tweet["id"]
                    creator_author_id = tweet["author_id"]
                    creator_author = [item for item in users if item.get(
                        'id') == creator_author_id][0]

                    self.action_taker_ids.append(action_taker_author_id)
                    self.action_takers.append(action_taker_author["username"])
                    self.tweet_ids.append(ancestor_tweet_id)
                    self.creator_ids.append(creator_author_id)
                    self.creators.append(creator_author["username"])
                    self.tweet_texts_relation.append(tweet["text"])

                    if ancestor_tweet_id not in self.tweet_ids_meta:
                        self.tweet_ids_meta.append(ancestor_tweet_id)
                        self.public_metrics = tweet["public_metrics"]
                        self.like_counts.append(
                            self.public_metrics["like_count"])
                        self.quote_counts.append(
                            self.public_metrics["quote_count"])
                        self.reply_counts.append(
                            self.public_metrics["reply_count"])
                        self.retweet_counts.append(
                            self.public_metrics["retweet_count"])
                        self.tweet_texts.append(tweet["text"])
                        self.tweet_authors_meta_ids.append(creator_author_id)
                        self.tweet_authors_meta_usernames.append(
                            creator_author["username"])
                except Exception as Error:
                    print("prep_data_with_response")
                    print(Error)
            else:
                print("boo")

    def start_analysis(self, recursion=RECURSION, max_result=MAX_RESULT):
        base_url = config("API_URL", cast=str)
        headers = {
            'content-type': 'application/json',
            "Authorization": config("TOKEN", cast=str)
        }
        q = self.query  # self.query.replace(" ", " OR ")
        params = {
            'max_results': max_result,
            'query': f'{q} is:retweet lang:en has:mentions',
            'expansions': 'referenced_tweets.id,referenced_tweets.id.author_id',
            'tweet.fields': 'public_metrics'
        }
        response = requests.get(base_url, params=params,
                                headers=headers).json()
        for i in range(0, recursion):
            response = requests.get(
                base_url, params=params, headers=headers).json()
            self.prep_data_with_response(response)
            if("next_token" in response["meta"]):
                print(self.query)
                print(response['meta']['next_token'])
                params['next_token'] = response['meta']['next_token']
            else:
                print(self.query)
                params['next_token'] = ""
                break

    def generate_graph_data_json(self):
        df_relation = pd.DataFrame(
            {
                "CreatorId": np.array(self.creator_ids),
                "Action": "retweeet",
                "ActionTakerId": np.array(self.action_taker_ids),
                "TweetId": np.array(self.tweet_ids),
                "CreatorUsername": np.array(self.creators),
                "ActionTakerUsername": np.array(self.action_takers),
                "Text": np.array(self.tweet_texts_relation),
            }
        )
        df_meta = pd.DataFrame(
            {
                "TweetId": np.array(self.tweet_ids_meta),
                "LikeCounts": np.array(self.like_counts),
                "QuoteCounts": np.array(self.quote_counts),
                "ReplyCounts": np.array(self.reply_counts),
                "RetweetCounts": np.array(self.retweet_counts),
                "Text": np.array(self.tweet_texts),
                "CreatorUsername": np.array(self.tweet_authors_meta_usernames),
                "CreatorId": np.array(self.tweet_authors_meta_ids),
            }
        )
        graph = nx.from_pandas_edgelist(df_relation.head(
            10000), 'ActionTakerUsername', 'CreatorUsername', ['Action', 'TweetId', 'Text'])
        data = json_graph.node_link_data(graph)
        degree_dict = dict(graph.degree(graph.nodes()))
        betweenness_dict = nx.betweenness_centrality(graph)
        data["comparison_centrality"] = {}
        sorted_degree = sorted(degree_dict.items(),
                               key=itemgetter(1), reverse=True)
        data["degree"] = {}
        for d in sorted_degree[:20]:
            data["degree"][d[0]] = d[1]
            data["comparison_centrality"][d[0]] = {
                "dc": d[1],
                "bc": betweenness_dict[d[0]]
            }

        sorted_betweenness = sorted(
            betweenness_dict.items(), key=itemgetter(1), reverse=True)
        data["betweenness_centrality"] = {}
        for b in sorted_betweenness[:20]:
            data["comparison_centrality"][b[0]] = {
                "bc": b[1],
                "dc": degree_dict[b[0]]
            }
            data["betweenness_centrality"][b[0]] = b[1]

        data["word_freq"] = self.get_words_with(tweets=df_meta["Text"])
        df_relation = []
        df_meta = []
        return data

    def send_data_to_S3(self):
        graph_data = self.generate_graph_data_json()
        graph_data["user"] = self.user
        graph_data["query"] = self.query
        graph_data_meta = {
            "nodes": len(graph_data["nodes"]),
            "edges": len(graph_data["links"]),
            "betweenness_centrality": graph_data["betweenness_centrality"],
            "degree": graph_data["degree"],
            "comparison_centrality": graph_data["comparison_centrality"]
        }
        graph_data_meta_json = json.dumps(graph_data_meta)

        self.search_service.insert_user_search(
            username=self.user["username"], query=self.query, graph_data=graph_data_meta_json)

        filename = f'{self.query.replace(" ", "_")}.json'
        with open(filename, "w") as test_file:
            test_file.write(json.dumps(graph_data))
            
            s3_resource = boto3.resource(
                's3',
                region_name=config('REGION_NAME', cast=str),
                aws_access_key_id=config('AWS_ACCESS_KEY_ID', cast=str),
                aws_secret_access_key=config('AWS_SECRET_ACCESS_KEY', cast=str)
            )
            s3_resource.Object("swedata", filename).upload_file(
                Filename=filename,
                ExtraArgs={
                    "ContentType": "application/json"
                }
            )
            os.remove(filename)
    
    def get_words_with(self, tweets):
        tt = TweetTokenizer(preserve_case=False,
                            strip_handles=True, reduce_len=True)
        word_count_dict = {}
        for tweet in tweets:
            tweet = self.cleaner(tweet)
            for word in tt.tokenize(tweet):
                if word in word_count_dict:
                    word_count_dict[word] += 1
                else:
                    word_count_dict[word] = 1
        return dict(sorted(word_count_dict.items(), key=lambda item: item[1]))

    def cleaner(self, tweet):
        tweet = re.sub("@[A-Za-z0-9]+", "", tweet)  # Remove @ sign
        tweet = re.sub(r"(?:\@|http?\://|https?\://|www)\S+",
                       "", tweet)
        tweet = " ".join(tweet.split())
        tweet = tweet.replace("#", "").replace("_", " ")
        tweet = tweet.translate(str.maketrans('', '', string.punctuation))
        tweet = ''.join(c for c in tweet if c not in emoji.UNICODE_EMOJI)
        return tweet
