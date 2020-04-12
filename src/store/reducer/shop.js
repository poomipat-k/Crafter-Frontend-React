import * as actionTypes from "../action/actionTypes";

let initialState = {
  displayImage: null,
};

const setDisplayImage = (state, action) => {
  return { ...state, displayImage: action.image };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DISPLAY_IMAGE:
      return setDisplayImage(state, action);

    default:
      return state;
  }
};

export default reducer;
