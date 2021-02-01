import ErrorManager from "./error-manager";
const axios = require("axios").default;

class ServiceManager {
  constructor() {
    this.errorManager = new ErrorManager();
  }
  async callService({ headers, method, url, data, params }) {
    const config = {
      url,
      method,
      headers,
      params,
      data,
    };
    return axios
      .request(config)
      .then((serverResponse) => {
        return serverResponse;
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.meta) {
          const { meta } = err.response.data;
          throw new Error(
            this.errorManager.getErrorMessage(
              meta.status_code,
              meta.default_code
            )
          );
        } else {
          throw new Error(this.errorManager.getErrorMessage(1000, "unknown"));
        }
      });
  }
}

export default ServiceManager;
