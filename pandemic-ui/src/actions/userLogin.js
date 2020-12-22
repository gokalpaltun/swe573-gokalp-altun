export const userLogin = (userCtx) => {
  return {
    type: "USER_LOG_IN",
    payload: userCtx,
  };
};
