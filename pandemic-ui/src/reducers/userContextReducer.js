const initialState = {
  userCtx: {},
  isLoggedIn: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  let userCtx;
  let isLoggedIn;
  switch (action.type) {
    case "USER_SIGN_UP":
      userCtx = action.payload;
      isLoggedIn = true;
      return { ...state, userCtx, isLoggedIn };
    case "USER_LOG_IN":
      userCtx = action.payload;
      isLoggedIn = true;
      return { ...state, userCtx, isLoggedIn };

    default:
      return { ...state };
  }
}
