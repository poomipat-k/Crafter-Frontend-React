import * as actionTypes from "./actionTypes";

export const setCartItems = (cart, quantity) => {
  return {
    type: actionTypes.SET_CART_ITEMS,
    cart: cart,
    quantity: quantity,
  };
};

export const updateCartItem = (id, quantity) => {
  return {
    type: actionTypes.UPDATE_CART_ITEM,
    itemId: id,
    quantity: quantity,
  };
};

export const checkoutItems = (data) => {
  return {
    type: actionTypes.CHECKOUT_ITEMS,
    items: data,
  };
};
