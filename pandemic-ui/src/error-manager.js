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
      message: "You dont have authorization to view this page.",
    },
  },
};

class ErrorManager {
  getErrorMessage(errorStatusCode, errorDetaultCode) {
    if (ERROR_TYPES[errorStatusCode][errorDetaultCode].message) {
      throw new Error(ERROR_TYPES[errorStatusCode][errorDetaultCode].message);
    } else {
      throw new Error("unknown error");
    }
  }
}

export default ErrorManager;
