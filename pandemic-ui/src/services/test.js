import Configuration from "../configuration";
import ServiceManager from "../service-manager";

class TestService {
  constructor() {
    this.config = new Configuration();
    this.serviceManager = new ServiceManager();
  }
  async hello() {
    try {
      const { url, method } = this.config.TEST_SERVICES.HELLO;
      const token = localStorage.getItem("token");
      const serverResponse = await this.serviceManager.callService({
        headers: { Authorization: `Token ${token}` },
        method,
        url,
        data: undefined,
        params: undefined,
      });
      const { data } = serverResponse.data;
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default TestService;
