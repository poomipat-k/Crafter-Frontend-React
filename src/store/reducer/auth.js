import * as actionTypes from "../action/actionTypes";

let initialState = {
  token: null,
  userId: null,
  tokenExpirationDate: null,
  isAdmin: false,
};

const login = (state, action) => {
  let updatedState = {
    ...state,
    token: action.token,
    userId: action.uid,
    isAdmin: action.isAdmin,
  };
  const tokenExpirationDate =
    action.expirationDate ||
    new Date(new Date().getTime() + 1000 * 60 * 60 * 24);

  updatedState.tokenExpirationDate = tokenExpirationDate;
  localStorage.setItem(
    "userData",
    JSON.stringify({
      userId: action.uid,
      token: action.token,
      expiration: tokenExpirationDate.toISOString(),
      isAdmin: action.isAdmin,
    })
  );

  return updatedState;
};

const logout = (state, action) => {
  localStorage.removeItem("userData");
  return {
    token: null,
    userId: null,
    tokenExpirationDate: null,
    isAdmin: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return login(state, action);
    case actionTypes.LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

export default reducer;
