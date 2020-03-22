import * as actionTypes from '../action/actionTypes';

// let contentFromAPI = {
//     body: {
//         colors: ['#555','green','blue'],
//         styles: [0, 1, 2]
//     },
//     collar: {
//         colors: ['salmon','orange', 'cyan', 'red'],
//         styles: [0, 1, 2, 3, 4]
//     },
//     placket: {
//         colors: ['#ccc', 'yellow', 'salmon'],
//         styles: [4, 5, 6]
//     },
//     sleeveEdge: {
//         colors: ['lightblue', 'darkgreen', 'purple'],
//         styles: [8, 9, 11]
//     },
//     button: {
//         colors: ['blue', 'red', 'lightgreen', 'orange'],
//         styles: [20, 30, 40]
//     }
// }

// let canvasFromAPI = {
//     body: {
//         colors: '#555',
//         styles: 0
//     },
//     collar: {
//         colors: 'salmon',
//         styles: 0
//     },
//     placket: {
//         colors: '#ccc',
//         styles: 0
//     },
//     sleeveEdge: {
//         colors: 'lightblue',
//         styles: 0
//     },
//     button: {
//         colors: 'blue',
//         styles: 0
//     }
// };

let initialState = {
    header : {
        product: 'polo',
        pattern: 1,
        material: 1
    },
    content: null,
    canvas: null,
    focusing: 'body' || null,
    error: false
}

const setDesignTemplate = (state, action) => {
    let updatedState = {...state};
    updatedState.content = action.designData.content;
    updatedState.canvas = action.designData.canvas
    return updatedState;
}

const fetchDesignTemplateFail = (state, action) => {
    let updatedState = {...state};
    updatedState.error = true;
    return updatedState;
}


const setFocus = (state, action) => {
    const updatedState = {...state};
    updatedState.focusing = action.id
    return updatedState;
}

const setCanvas = (state, action) => {
    let canvasPartNames = Object.keys(state.content);
    let canvasObject = {};
    canvasPartNames.forEach(name => {
        let attr = Object.keys(state.content[name]);
        canvasObject[name] = {};
        attr.forEach(att => {
            canvasObject[name][att] = null;
        });
    });

    const updatedState = {...state};
    updatedState.canvas = canvasObject;
    return updatedState;
}

const setFocusColor = (state, action) => {
    let updatedState = {...state}
    updatedState.canvas = {...state.canvas};
    updatedState.canvas[action.focusing] = {...state.canvas[action.focusing]};
    updatedState.canvas[action.focusing].colors = action.selectedColor;
    return updatedState;
}

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.SET_DESIGN_TEMPLATE: return setDesignTemplate(state, action);
        case actionTypes.FETCH_DESIGN_TEMPLATE_FAIL: return fetchDesignTemplateFail(state, action);
        case actionTypes.SET_FOCUS: return setFocus(state, action);
        case actionTypes.SET_CANVAS: return setCanvas(state, action);
        case actionTypes.SET_FOUCS_COLOR: return setFocusColor(state, action);
        default: return state;
    }
} 

export default reducer;