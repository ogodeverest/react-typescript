import { combineReducers, Reducer } from "redux";
import todosReducer from "../reducers/todosReducer";
import { StoreState } from "../models/StoreState";

const rootReducer = combineReducers<StoreState>({
  todos: todosReducer
});

export default rootReducer;
