import React, { FunctionComponent, MouseEvent } from "react";
import { List, Icon, Button } from "antd";
import Todo from "../../../models/todo";
import { Checkbox } from "antd";
import ButtonGroup from "antd/lib/button/button-group";

export interface Props {
  todos: Todo[];
  loading: boolean;
  onUnCompleteTodos: (todos: Todo[]) => void;
}
const CompletedTodos: FunctionComponent<Props> = ({
  todos,
  loading,
  onUnCompleteTodos
}) => {
  return (
    <div className="animate">
      <List
        size="large"
        header={<div>Completed</div>}
        footer={
          <div>
            <ButtonGroup>
              {todos.length > 0 && (
                <Button
                  type="danger"
                  disabled={loading}
                  onClick={(event: MouseEvent<HTMLButtonElement>) => {
                    onUnCompleteTodos(todos);
                  }}
                >
                  Uncheck All
                  <Icon type="close" />
                </Button>
              )}
            </ButtonGroup>
          </div>
        }
        bordered
        dataSource={todos}
        renderItem={(item: Todo) => (
          <List.Item>
            <Checkbox
              key={item.id}
              defaultChecked
              disabled={loading}
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                onUnCompleteTodos([item]);
              }}
            >
              {item.title}
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CompletedTodos;
