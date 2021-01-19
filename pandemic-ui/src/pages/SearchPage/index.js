import React from "react";
import { Search } from "../../components/search";
import AnalysisService from "../../services/analysis";
import SearchService from "../../services/search";

export class SearchPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      existedAnalysisList: [],
      filteredAnalysisList: [],
      query: "",
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
          alert("finished");
        }
      } catch (error) {
        throw new Error(error);
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
    this.props.history.push("/home");
    return graphData;
  };

  componentDidMount() {
    this.searchService
      .search()
      .then((data) => {
        this.setState({ existedAnalysisList: data.searchItems });
      })
      .catch((err) => console.log(err));
  }

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
    let searchAnalysis = this.state.searchAnalysis;
    existedAnalysisList =
      existedAnalysisList &&
      existedAnalysisList.filter((cat) => {
        return cat.title.toLowerCase().indexOf(searchAnalysis) !== -1;
      });
    this.setState({ filteredAnalysisList: existedAnalysisList });
  };

  render() {
    return (
      <div>
        <Search
          searchAnalysis={this.state.searchAnalysis}
          searchChange={this.searchChange}
          existedAnalysisList={this.state.existedAnalysisList}
          onAnalysisClicked={this.onAnalysisClicked}
          onShowGraphClicked={this.onShowGraphClicked}
        />
      </div>
    );
  }
}
