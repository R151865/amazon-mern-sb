import React from "react";

const AppContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  updateCartItem: () => {},
  clearAllCartItems: () => {},
  userAddress: {},
  addUserAddess: () => {},
});

export default AppContext;
