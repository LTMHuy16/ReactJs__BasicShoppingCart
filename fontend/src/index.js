import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import productSlice, { productFetch } from "./features/productSlice";
import { productApi } from "./features/productApi";
import cartSlice, { getTotal } from "./features/cartSlice";

/**
 * ==========================================
 * ======== CONFIGURATION REDUX STORE =======
 */
const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

/**
 * ==========================================
 * ======= LOAD DATA WHEN THE FIRST LOAD ====
 */
store.dispatch(productFetch());
store.dispatch(getTotal());




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
