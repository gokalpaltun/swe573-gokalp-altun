class Configuration {
  BASE_URL = "http://localhost:8000/api/v1/";

  USER_SERVICES = {
    LOGIN: {
      url: this.BASE_URL + "login/",
      method: "POST",
    },
    SIGNUP: {
      url: this.BASE_URL + "signup/",
      method: "POST",
    },
  };
  SEARCH_SERVICE = {
    SEARCH: {
      url: this.BASE_URL + "search/",
      method: "GET",
    },
  };
  TEST_SERVICES = {
    HELLO: {
      url: this.BASE_URL + "hello/",
      method: "GET",
    },
  };
  ANALYSIS_SERVICE = {
    ANALYSIS: {
      url: this.BASE_URL + "analysis/",
      method: "POST",
    },
  };
}
export default Configuration;
