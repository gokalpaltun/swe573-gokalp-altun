import Configuration from "../configuration";
import ServiceManager from "../service-manager";

class AnalysisService {
  constructor() {
    this.config = new Configuration();
    this.serviceManager = new ServiceManager();
  }
  async dataAnalysis({ query }) {
    try {
      const { url, method } = this.config.ANALYSIS_SERVICE.ANALYSIS;
      const token = localStorage.getItem("token");
      const serverResponse = await this.serviceManager.callService({
        headers: { Authorization: `Token ${token}` },
        method,
        url,
        data: { query },
        params: undefined,
      });
      const { data } = serverResponse.data;
      return { status: data.status };
    } catch (error) {
      throw error;
    }
  }
}
export default AnalysisService;
