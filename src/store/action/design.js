import * as actionTypes from "./actionTypes";
import axios from "axios";

const setDesignTemplate = data => {
  return {
    type: actionTypes.SET_DESIGN_TEMPLATE,
    designData: data
  };
};

const fetchDesignTemplateFail = () => {
  return {
    type: actionTypes.FETCH_DESIGN_TEMPLATE_FAIL
  };
};

export const getDesignTemplate = url => {
  return dispatch => {
    axios
      .get(url)
      .then(response => {
        dispatch(setDesignTemplate(response.data));
      })
      .catch(error => {
        dispatch(fetchDesignTemplateFail());
      });
  };
};

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
