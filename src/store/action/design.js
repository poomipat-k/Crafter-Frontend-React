import * as actionTypes from "./actionTypes";

export const setDesignTemplate = (data) => {
  return {
    type: actionTypes.SET_DESIGN_TEMPLATE,
    data: data
  }
}

export const setFocus = id => {
  return {
    type: actionTypes.SET_FOCUS,
    id: id
  };
};

export const setCanvas = () => {
  return {
    type: actionTypes.SET_CANVAS
  };
};

export const setFocusColor = (focusing, color) => {
  return {
    type: actionTypes.SET_FOUCS_COLOR,
    focusing: focusing,
    selectedColor: color
  };
};
