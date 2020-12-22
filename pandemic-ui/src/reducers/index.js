import userContextReducer from "./userContextReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  ctx: userContextReducer,
});

export default allReducers;
