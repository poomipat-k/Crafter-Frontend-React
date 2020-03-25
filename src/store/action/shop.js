import * as actionTypes from "./actionTypes";

export const setDisplayImage = image => {
    return {
        type: actionTypes.SET_DISPLAY_IMAGE,
        image: image
    };
};