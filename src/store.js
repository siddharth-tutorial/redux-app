import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../src/Components/counterslice";
import productReducer from "../src/Components/productslice";
import movieReducer from "../src/Components/movieslice";
import blogReducer from "../src/Components/blogslice";
import cartReducer from "../src/Components/cartSlice"
export default configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    movie: movieReducer,
    blog: blogReducer,
    cart:cartReducer,
  },
});
