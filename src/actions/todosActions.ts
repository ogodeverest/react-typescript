import url from "../api";
import { from, Subscription } from "rxjs";
import { pluck, map } from "rxjs/operators";
import * as constants from "../constants";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import Todo from "../models/todo";
import { openNotification } from "../containers/TodosPage";

export interface TodosActionStarted {
  type: constants.TODOS_ACTION_STARTED;
  payload: any;
}

export interface InitTodosSuccess {
  type: constants.INIT_TODOS_SUCCESS;
  payload: any;
}

export interface TodosActionError {
  type: constants.TODOS_ACTION_ERROR;
  payload: any;
}

export interface CompleteTodosSuccess {
  type: constants.COMPLETE_TODOS_SUCCESS;
  payload: any;
}
export interface UnCompleteTodosSuccess {
  type: constants.UNCOMPLETE_TODOS_SUCCESS;
  payload: any;
}

export type TodosActions =
  | TodosActionStarted
  | InitTodosSuccess
  | TodosActionError
  | CompleteTodosSuccess
  | UnCompleteTodosSuccess;

export const initTodos = (): ThunkAction<
  Subscription,
  {},
  {},
  TodosActions
> => {
  return (dispatch: ThunkDispatch<{}, {}, TodosActions>) => {
    dispatch(todosActionStart());
    const observable = from(url.get(`todos`));
    return observable
      .pipe(
        pluck("data"),
        map(data => data.slice(0, 10))
      )
      .subscribe(
        data => {
          dispatch(initTodosSuccess(data));
        },
        err => {
          dispatch(todosActionError(err));
        }
      );
  };
};

const todosActionStart = (): TodosActions => ({
  type: constants.TODOS_ACTION_STARTED,
  payload: {}
});

const initTodosSuccess = (data: any): TodosActions => ({
  type: constants.INIT_TODOS_SUCCESS,
  payload: {
    data
  }
});
const todosActionError = (err: any): TodosActions => ({
  type: constants.TODOS_ACTION_ERROR,
  payload: {
    err
  }
});

// complete todos

const completeTodoSuccess = (data: any): TodosActions => ({
  type: constants.COMPLETE_TODOS_SUCCESS,
  payload: {
    data
  }
});

export const completeTodos = (
  todo: Todo
): ThunkAction<Subscription, {}, {}, TodosActions> => {
  return (dispatch: ThunkDispatch<{}, {}, TodosActions>) => {
    dispatch(todosActionStart());
    const observable = from(url.patch(`todos/${todo.id}`, { completed: true }));
    return observable.pipe(pluck("data")).subscribe(
      data => {
        dispatch(completeTodoSuccess(data));
        openNotification("success", "You successfully completed the todo");
      },
      err => {
        dispatch(todosActionError(err));
        openNotification("error", "An error ocurred trying to complete todo");
      }
    );
  };
};
//Uncomplete todos
export const unCompleteTodos = (
  todo: Todo
): ThunkAction<Subscription, {}, {}, TodosActions> => {
  return (dispatch: ThunkDispatch<{}, {}, TodosActions>) => {
    dispatch(todosActionStart());
    const observable = from(url.patch(`todos/${todo.id}`, { completed: true }));
    return observable.pipe(pluck("data")).subscribe(
      data => {
        console.log(data);
        dispatch(unCompleteTodoSuccess(data));
        openNotification("success", "Todo was removed from completed list.");
      },
      err => {
        console.log(err);
        dispatch(todosActionError(err));
        openNotification(
          "error",
          "There was an error trying to remove todo from completed list."
        );
      }
    );
  };
};

const unCompleteTodoSuccess = (data: any): TodosActions => ({
  type: constants.UNCOMPLETE_TODOS_SUCCESS,
  payload: {
    data
  }
});
