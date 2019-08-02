import React, { useEffect, FunctionComponent, Fragment } from "react";
import Todos from "./components/Todos";
import CompletedTodos from "./components/CompletedTodos";
import { connect } from "react-redux";
import Container from "../../components/Container";
import styled from "styled-components";
import {
  initTodos,
  TodosActions,
  completeTodos,
  unCompleteTodos
} from "../../actions/todosActions";
import { ThunkDispatch } from "redux-thunk";
import { StoreState } from "../../models/StoreState";
import Todo from "../../models/todo";
import { unfinishedTodos, finishedTodos } from "../../selectors/TodosSelector";
import { Button, notification, Icon } from "antd";

export interface Props {
  unfinishedTodos: Todo[];
  finishedTodos: Todo[];
  loading: boolean;
  onInitTodos: () => void;
  onCompleteTodos: (todo: Todo) => void;
  onUnCompleteTodos: (todo: Todo) => void;
  error: any;
}

const TodosContainer = styled(Container)`
  margin-top: 1em;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(400px, auto);
  grid-gap: 1em;
`;

export const openNotification = (type: any, description: string) => {
  notification.open({
    type,
    message: type == "success" ? "Good Job" : "Error",
    description: description
  });
};

const TodosPage: FunctionComponent<Props> = ({
  unfinishedTodos,
  finishedTodos,
  onInitTodos,
  onCompleteTodos,
  onUnCompleteTodos,
  loading,
  error
}) => {
  useEffect(() => {
    onInitTodos();
  }, []);

  const completeTodos = (todos: Todo[]) => {
    todos.forEach(todo => {
      onCompleteTodos(todo);
    });
  };

  const unCompleteTodos = (todos: Todo[]) => {
    todos.forEach(todo => {
      onUnCompleteTodos(todo);
    });
  };

  return (
    <Fragment>
      <TodosContainer>
        <Todos
          todos={unfinishedTodos}
          onCompleteTodos={completeTodos}
          loading={loading}
        />
        <CompletedTodos
          todos={finishedTodos}
          loading={loading}
          onUnCompleteTodos={unCompleteTodos}
        />
      </TodosContainer>
    </Fragment>
  );
};

const mapStateToProps = (state: StoreState) => ({
  unfinishedTodos: unfinishedTodos(state),
  finishedTodos: finishedTodos(state),
  loading: state.todos.loading,
  error: state.todos.error
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, TodosActions>) => {
  return {
    onInitTodos: () => {
      dispatch(initTodos());
    },
    onCompleteTodos: (todo: Todo) => {
      dispatch(completeTodos(todo));
    },
    onUnCompleteTodos: (todo: Todo) => {
      dispatch(unCompleteTodos(todo));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosPage);
