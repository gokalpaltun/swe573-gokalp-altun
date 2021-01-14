import React from "react";
import { Search } from "../../components/search";
import AnalysisService from "../../services/analysis";

export class SearchPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      existedAnalysisList: [],
      filteredAnalysisList: [],
      query: "",
    };
    this.analysisService = new AnalysisService();
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
        />
      </div>
    );
  }
}
