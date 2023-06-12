import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import productsReducer from "./features/products/productsSlice";


const store = configureStore({
    reducer: {
    counter: counterReducer,
    products: productsReducer,
    },
  });

  export default store;