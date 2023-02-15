import {configureStore} from "@reduxjs/toolkit"
import { newReducer } from "./reducer";

const store=configureStore({
    reducer:{
        ToDoList:newReducer,
    }
})
export default store;