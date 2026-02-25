// Redux store setup
import { configureStore } from "@reduxjs/toolkit";

import bookReducer from "./bookSlice";
import cartReducer from "./cartSlice";
import cartApiReducer from "./cartApiSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    books: bookReducer,
    cart: cartReducer,
    cartApi: cartApiReducer,
    user: userReducer,
  },
});

export default store;
