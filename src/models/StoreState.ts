import Todo from "./todo";
import { InitialState as TodosState } from "../reducers/todosReducer";
export interface StoreState {
  todos: TodosState;
}
