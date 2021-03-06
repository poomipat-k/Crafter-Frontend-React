import * as actionTypes from "../action/actionTypes";

let initialState = {
  header: {
    product: "polo",
    pattern: 1,
    material: 1,
  },
  content: null,
  canvas: null,
  focusing: "body" || null,
};

const setDesignTemplate = (state, action) => {
  const updatedState = { ...state };
  updatedState.content = action.data.content;
  updatedState.canvas = action.data.canvas;
  return updatedState;
};

const setFocus = (state, action) => {
  const updatedState = { ...state };
  updatedState.focusing = action.id;
  return updatedState;
};

const setCanvas = (state, action) => {
  let canvasPartNames = Object.keys(state.content);
  let canvasObject = {};
  canvasPartNames.forEach((name) => {
    let attr = Object.keys(state.content[name]);
    canvasObject[name] = {};
    attr.forEach((att) => {
      canvasObject[name][att] = null;
    });
  });

  const updatedState = { ...state };
  updatedState.canvas = canvasObject;
  return updatedState;
};

const setFocusColor = (state, action) => {
  let updatedState = { ...state };
  updatedState.canvas = { ...state.canvas };
  updatedState.canvas[action.focusing] = { ...state.canvas[action.focusing] };
  updatedState.canvas[action.focusing].colors = action.selectedColor;
  return updatedState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DESIGN_TEMPLATE:
      return setDesignTemplate(state, action);
    case actionTypes.SET_FOCUS:
      return setFocus(state, action);
    case actionTypes.SET_CANVAS:
      return setCanvas(state, action);
    case actionTypes.SET_FOUCS_COLOR:
      return setFocusColor(state, action);
    default:
      return state;
  }
};

export default reducer;
