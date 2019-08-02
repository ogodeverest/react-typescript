import { createSelector } from "reselect";
import Todo from "../models/todo";
import { StoreState } from "../models/StoreState";

const todoSelector = (state: StoreState) => state.todos.todos;

export const unfinishedTodos = createSelector(
  [todoSelector],
  todos => {
    return todos.filter((todo: Todo) => todo.completed != true);
  }
);

export const finishedTodos = createSelector(
  [todoSelector],
  todos => {
    return todos.filter((todo: Todo) => todo.completed == true);
  }
);

// ...
