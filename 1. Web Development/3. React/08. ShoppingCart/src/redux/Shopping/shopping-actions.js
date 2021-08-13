import * as actionTypes from "./shopping-types";

// ****** tells konse function ko konsa type ka action bnana -> ky krna= reducer*************

// get item from product array
// if already in cart -> update qty | else -> add item
export const addToCart = (itemID) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID,
    },
  };
};

// filter items whose id!=itemId
export const removeFromCart = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  };
};

// update qty of itemId
export const adjustItemQty = (itemID, qty) => {
  console.log(qty);
  return {
    type: actionTypes.ADJUST_ITEM_QTY,
    payload: {
      id: itemID,
      qty,
    },
  };
};

// currentItem = payload
export const loadCurrentItem = (item) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};
