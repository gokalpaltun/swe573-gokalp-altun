import numpy as np
import pandas as pd
import requests
import networkx as nx
from networkx.readwrite import json_graph
import os
import json
import boto3
from decouple import config
RECURSION = 1
MAX_RESULT = 10


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

    def prep_data_with_response(self, response):
        users = response["includes"]["users"]
        referenced_tweets = response["includes"]["tweets"]
        for data in response["data"]:
            action_taker_author_id = data["author_id"]
            action_taker_author = [item for item in users if item.get(
                'id') == action_taker_author_id][0]
            self.action_taker_ids.append(action_taker_author_id)
            self.action_takers.append(action_taker_author["username"])

            referenced_tweet_id = data["referenced_tweets"][0]["id"]
            tweet = [item for item in referenced_tweets if item.get(
                'id') == referenced_tweet_id][0]
            ancestor_tweet_id = tweet["id"]
            self.tweet_ids.append(ancestor_tweet_id)

            creator_author_id = tweet["author_id"]
            creator_author = [item for item in users if item.get(
                'id') == creator_author_id][0]
            self.creator_ids.append(creator_author_id)
            self.creators.append(creator_author["username"])

            self.tweet_texts_relation.append(tweet["text"])

            if ancestor_tweet_id not in self.tweet_ids_meta:
                self.tweet_ids_meta.append(ancestor_tweet_id)
                self.public_metrics = tweet["public_metrics"]
                self.like_counts.append(self.public_metrics["like_count"])
                self.quote_counts.append(self.public_metrics["quote_count"])
                self.reply_counts.append(self.public_metrics["reply_count"])
                self.retweet_counts.append(
                    self.public_metrics["retweet_count"])
                self.tweet_texts.append(tweet["text"])
                self.tweet_authors_meta_ids.append(creator_author_id)
                self.tweet_authors_meta_usernames.append(
                    creator_author["username"])

    def query(self, recursion=RECURSION, max_result=MAX_RESULT):
        base_url = config("API_URL", cast=str)
        headers = {
            'content-type': 'application/json',
            "Authorization": config("TOKEN", cast=str)
        }
        params = {
            'max_results': max_result,
            'query': 'corona pandemic is:retweet lang:en has:mentions',
            'expansions': 'referenced_tweets.id,referenced_tweets.id.author_id',
            'tweet.fields': 'public_metrics'
        }
        response = requests.get(base_url, params=params,
                                headers=headers).json()
        for i in range(0, recursion):
            response = requests.get(
                base_url, params=params, headers=headers).json()
            self.prep_data_with_response(response)
            if(response['meta']['next_token'] is not None):
                params['next_token'] = response['meta']['next_token']

    def generate_graph_data_json(self):
        # df_meta = pd.DataFrame(
        #     {
        #         "TweetId": np.array(self.tweet_ids_meta),
        #         "LikeCounts": np.array(self.like_counts),
        #         "QuoteCounts": np.array(self.quote_counts),
        #         "ReplyCounts": np.array(self.reply_counts),
        #         "RetweetCounts": np.array(self.retweet_counts),
        #         "Text": np.array(self.tweet_texts),
        #         "CreatorUsername": np.array(self.tweet_authors_meta_usernames),
        #         "CreatorId": np.array(self.tweet_authors_meta_ids),
        #     }
        # )

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
        # di_graph = nx.from_pandas_edgelist(df_relation.head(550), 'ActionTakerUsername', 'CreatorUsername', [
        #                                    'Action', 'TweetId', 'Text'], create_using=nx.DiGraph())
        graph = nx.from_pandas_edgelist(df_relation.head(
            550), 'ActionTakerUsername', 'CreatorUsername', ['Action', 'TweetId', 'Text'])
        data = json_graph.node_link_data(graph)
        return data

    def send_data_to_S3(self):
        graph_data = self.generate_graph_data_json()

        with open("testpython.json", "w") as test_file:
            test_file.write(json.dumps(graph_data))

        s3_resource = boto3.resource(
            's3',
            region_name=config('REGION_NAME', cast=str),
            aws_access_key_id=config('AWS_ACCESS_KEY_ID', cast=str),
            aws_secret_access_key=config('AWS_SECRET_ACCESS_KEY', cast=str)
        )
        s3_resource.Object("swedata", "testpython.json").upload_file(
            Filename="testpython.json",
            ExtraArgs={
                "ContentType": "application/json"
            }
        )
        os.remove("testpython.json")

# TEST REASON
das = DataAnalysisService()
das.query()
das.send_data_to_S3()



