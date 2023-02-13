import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postSlice";


export const store = configureStore({
    reducer: {
        posts: postReducer,
        auth: authReducer,
    }
})