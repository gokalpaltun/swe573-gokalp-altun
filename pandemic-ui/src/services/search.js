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
      throw new Error(error);
    }
  }
}
export default SearchService;
