import { createSlice } from "@reduxjs/toolkit";
import { toastSuccess } from "../utils/toastCustomize";

const originCartItems = localStorage.getItem("cartItem__")
  ? JSON.parse(localStorage.getItem("cartItem__"))
  : [];

const initialState = {
  cartItems: originCartItems,
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toastSuccess(
          `🦄 Increased ${state.cartItems[itemIndex].name} quantities !!!`
        );
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toastSuccess(`🦄 Added ${action.payload.name} to cart`);
      }

      localStorage.setItem("cartItem__", JSON.stringify(state.cartItems));
    },
    removeCart: (state, action) => {
      const newCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );

      state.cartItems = newCartItems;

      toastSuccess(`🦄 Removed ${action.payload.name} from cart`, "error");

      localStorage.setItem("cartItem__", JSON.stringify(state.cartItems));
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      const changedItem = state.cartItems[itemIndex];

      if (changedItem.cartQuantity > 1) {
        changedItem.cartQuantity -= 1;
      } else if (changedItem.cartQuantity === 1) {
        const newCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = newCartItems;
        toastSuccess(`🦄 Removed ${action.payload.name} from cart`, "error");
      }

      localStorage.setItem("cartItem__", JSON.stringify(state.cartItems));
    },
    increaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      const changedItem = state.cartItems[itemIndex];
      changedItem.cartQuantity += 1;
      localStorage.setItem("cartItem__", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItem__", JSON.stringify(state.cartItems));

      toastSuccess(`🦄 Removed all products from cart`, "error");
    },
    getTotal: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity
      state.cartTotalAmount = total
    },
  },
});

export const {
  addToCart,
  removeCart,
  decreaseQuantity,
  increaseCart,
  clearCart,
  getTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
