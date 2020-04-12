import * as actionTypes from "./actionTypes";

export const login = (uid, token, expirationDate, isAdmin) => {
  return {
    type: actionTypes.LOGIN,
    uid: uid,
    token: token,
    expirationDate: expirationDate,
    isAdmin: isAdmin,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
