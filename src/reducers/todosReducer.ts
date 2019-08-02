import { Reducer, Action } from "redux";
import { TodosActions } from "../actions/todosActions";
import Todo from "../models/todo";
import {
  INIT_TODOS_SUCCESS,
  COMPLETE_TODOS_SUCCESS,
  TODOS_ACTION_STARTED,
  TODOS_ACTION_ERROR,
  UNCOMPLETE_TODOS_SUCCESS
} from "../constants";

export interface InitialState {
  todos: Todo[];
  loading: boolean;
  error: any;
}

const initialState: InitialState = {
  todos: [],
  loading: false,
  error: {}
};
const todosReducer = (state = initialState, action: TodosActions) => {
  switch (action.type) {
    case TODOS_ACTION_STARTED:
      return { ...state, loading: true };
    case INIT_TODOS_SUCCESS:
      return { ...state, todos: [...action.payload.data], loading: false };
    case TODOS_ACTION_ERROR:
      return { ...state, loading: false, error: action.payload.error };
    case COMPLETE_TODOS_SUCCESS:
      const todos = state.todos.map(todo =>
        todo.id == action.payload.data.id ? { ...todo, completed: true } : todo
      );
      return { ...state, loading: false, todos };
    case UNCOMPLETE_TODOS_SUCCESS:
      const newTodos = state.todos.map(todo =>
        todo.id == action.payload.data.id ? { ...todo, completed: false } : todo
      );
      console.log(newTodos);
      return { ...state, loading: false, todos: newTodos };

    default:
      return state;
  }
};

export default todosReducer;
