export const userSignup = (userCtx) => {
  return {
    type: "USER_SIGN_UP",
    payload: userCtx,
  };
};
