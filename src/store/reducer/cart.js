import * as actionTypes from "../action/actionTypes";

let initialState = {
  cart: [],
  quantity: 0,
  checkoutItems: [],
};

const setCartItems = (state, action) => {
  return { ...state, cart: action.cart, quantity: action.quantity };
};

const updateCartItem = (state, action) => {
  let updatedState = { ...state };
  updatedState.cart = [...state.cart];
  const index = state.cart.findIndex((item) => item.id === action.itemId);
  updatedState.cart[index] = { ...state.cart[index] };
  const prevItemQuantity = updatedState.cart[index].quantity;

  updatedState.cart[index].quantity = +action.quantity;
  const delta = +action.quantity - prevItemQuantity;
  updatedState.quantity = updatedState.quantity + delta;
  return updatedState;
};

const checkoutItem = (state, action) => {
  let updatedState = { ...state };
  updatedState.checkoutItems = action.items;
  return updatedState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CART_ITEMS:
      return setCartItems(state, action);

    case actionTypes.UPDATE_CART_ITEM:
      return updateCartItem(state, action);

    case actionTypes.CHECKOUT_ITEMS:
      return checkoutItem(state, action);

    default:
      return state;
  }
};

export default reducer;
