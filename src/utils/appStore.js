import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./userSlice"
import moviesreducer from "./moviesSlice"
import GPTreducer from "./gptSlice"
import configReducer from "./configSlice"
const appStore=configureStore(
    {
        reducer:{
            user:userreducer,
            movies:moviesreducer,
            gpt:GPTreducer,
            config:configReducer
        }
    }
)
export default appStore;