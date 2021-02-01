const ERROR_TYPES = {
  400: {
    user_cannot_login: {
      message: "User cannot login successfuly",
    },
  },
  401: {
    authentication_failed: {
      message: "User token is invalid",
    },
  },
  403: {
    anonymous_user_error: {
      message: "You dont have authorization to view this page.",
    },
  },
  409: {
    user_already_exists: {
      message: "Already Existed email or username",
    },
  },
  417: {
    analysis_cannot_finished: {
      message: "Analysis cannot finished with success status",
    },
  },
};

class ErrorManager {
  getErrorMessage(errorStatusCode, errorDetaultCode) {
    if (ERROR_TYPES[errorStatusCode][errorDetaultCode].message) {
      const err = new CustomError(
        ERROR_TYPES[errorStatusCode][errorDetaultCode].message,
        errorStatusCode
      );
      if (err.code === 401) {
        localStorage.removeItem("state");
        localStorage.removeItem("graphData");
        localStorage.removeItem("token");
      }
      throw err;
    } else {
      throw new Error("unknown error");
    }
  }
}

class CustomError extends Error {
  constructor(message, code) {
    super();
    this.name = "CustomError";
    this.message = message;
    this.code = code;
  }
}

export default ErrorManager;
