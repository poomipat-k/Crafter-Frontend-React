import * as actionTypes from "./actionTypes";

// new post page
export const setDisplayImage = (image) => {
  return {
    type: actionTypes.SET_DISPLAY_IMAGE,
    image: image,
  };
};
