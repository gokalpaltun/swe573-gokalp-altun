import React from "react";
import { Search } from "../../components/Search";
import AnalysisService from "../../services/analysis";
import SearchService from "../../services/search";

export class SearchPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      existedAnalysisList: [],
      filteredAnalysisList: [],
      query: "",
      redirectPage: null,
    };
    this.analysisService = new AnalysisService();
    this.searchService = new SearchService();
  }

  onAnalysisClicked = async (e) => {
    e.preventDefault();
    const query = this.state.query;
    if (query === "") {
      alert("Empty search! cannot be acceptable");
    } else if (query.split(" ").length < 3) {
      alert("At least 3 different search tag");
    } else {
      try {
        const { status } = await this.analysisService.dataAnalysis({ query });
        if (status) {
          this.fetchAllSearchedCategories();
          this.setState({ query: "" }, () => this.filterList());
        }
      } catch (error) {
        if (error.code === 417) {
          alert("Cannot find tweets or users with using these keywords");
        } else {
          alert(error);
        }
        this.setState({ query: "" }, () => this.filterList());
      }
    }
  };

  onShowGraphClicked = async (e) => {
    let queryArgs = e.target.value.split(" ");
    let fileName = "";
    for (let index = 0; index < queryArgs.length; index++) {
      const arg = queryArgs[index];
      if (index === 0 || index === queryArgs.length - 1) {
        fileName += arg;
      } else if (index !== 0 && index !== queryArgs.length - 1) {
        fileName += `_${arg}_`;
      }
    }
    fileName += ".json";
    const graphData = await this.searchService.getGraphData(fileName);
    this.setState({ redirectPage: "/home" });
    return graphData;
  };

  componentDidMount() {
    this.fetchAllSearchedCategories();
  }

  fetchAllSearchedCategories = async () => {
    this.searchService
      .search()
      .then((data) => {
        this.setState({
          existedAnalysisList: data.searchItems,
          filteredAnalysisList: data.searchItems,
        });
      })
      .catch((err) => {
        if (err.code === 401) {
          this.setState({ redirectPage: "/login" });
        }
        this.setState({ query: "" }, () => this.filterList());
      });
  };

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        existedAnalysisList: nextProps.existedAnalysisList,
        filteredAnalysisList: nextProps.filteredAnalysisList,
      },
      () => this.filterList()
    );
  }

  searchChange = (event) => {
    const query = event.target.value.toLowerCase();
    this.setState({ query }, () => this.filterList());
  };

  filterList = () => {
    let existedAnalysisList = this.state.existedAnalysisList;
    let searchAnalysis = this.state.query;
    existedAnalysisList =
      existedAnalysisList &&
      existedAnalysisList.filter((cat) => {
        return cat.query.toLowerCase().indexOf(searchAnalysis) !== -1;
      });
    this.setState({ filteredAnalysisList: existedAnalysisList });
  };

  render() {
    return (
      <div>
        <Search
          query={this.state.query}
          searchAnalysis={this.state.searchAnalysis}
          searchChange={this.searchChange}
          filteredAnalysisList={this.state.filteredAnalysisList}
          onAnalysisClicked={this.onAnalysisClicked}
          onShowGraphClicked={this.onShowGraphClicked}
          redirectPage={this.state.redirectPage}
        />
      </div>
    );
  }
}
