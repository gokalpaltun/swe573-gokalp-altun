import Configuration from "../configuration";
import ServiceManager from "../service-manager";

class UserService {
  constructor() {
    this.config = new Configuration();
    this.serviceManager = new ServiceManager();
  }
  async userSignup({ username, password, email }) {
    try {
      const { url, method } = this.config.USER_SERVICES.SIGNUP;
      const serverResponse = await this.serviceManager.callService({
        headers: undefined,
        method,
        url,
        data: { username, password, email },
        params: undefined,
      });
      const { data } = serverResponse.data;
      localStorage.setItem("token", data.token.key);
      return {
        token: data.token,
        user: data.user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async userLogin({ username, password }) {
    try {
      const { url, method } = this.config.USER_SERVICES.LOGIN;
      const serverResponse = await this.serviceManager.callService({
        headers: undefined,
        method,
        url,
        data: { username, password },
        params: undefined,
      });
      const { data } = serverResponse.data;
      localStorage.setItem("token", data.token.key);
      return {
        token: data.token,
        user: data.user,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default UserService;
