import Configuration from "../configuration";
import ServiceManager from "../service-manager";

class SearchService {
  constructor() {
    this.config = new Configuration();
    this.serviceManager = new ServiceManager();
  }
  async search() {
    try {
      const { url, method } = this.config.SEARCH_SERVICE.SEARCH;
      const token = localStorage.getItem("token");
      const serverResponse = await this.serviceManager.callService({
        headers: { Authorization: `Token ${token}` },
        method,
        url,
        data: undefined,
        params: undefined,
      });
      const { data } = serverResponse.data;
      return { searchItems: data.searched_items };
    } catch (error) {
      throw error;
    }
  }
  async getGraphData(fileName) {
    try {
      localStorage.removeItem("graphData");
      const { url, method } = this.config.SEARCH_SERVICE.GRAPH_DATA;
      const s3Url = url + fileName;
      const serverResponse = await this.serviceManager.callService({
        headers: {
          Accept: "application/json",
        },
        method,
        url: s3Url,
        data: undefined,
        params: undefined,
      });
      const { data } = serverResponse;
      localStorage.setItem("graphData", JSON.stringify(data));
      return data;
    } catch (error) {
      throw error;
    }
  }
}
export default SearchService;
