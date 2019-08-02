import React, { FunctionComponent, MouseEvent, useState } from "react";
import { List, Button, Icon, Modal } from "antd";
import Todo from "../../../models/todo";
import { Checkbox } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import DynamicForm from "./DynamicForm";
import { uuidv4 } from "uuid/v4";
export interface Props {
  todos: Todo[];
  onCompleteTodos: (todos: Todo[]) => void;
  loading: boolean;
}
const Todos: FunctionComponent<Props> = ({
  todos,
  onCompleteTodos,
  loading
}) => {
  const [visible, setVisible] = useState(false);
  const handleCancel = () => {
    setVisible(false);
  };

  const submitTodos = (todos: Object[]) => {
    const newTodos: Todo[] = todos.map((todo: any) => {
      return { ...todo, completed: false, id: uuidv4(), userId: uuidv4() };
    });
    console.log(newTodos);
  };

  return (
    <div className="animate">
      <Modal
        title="Add Todos"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <DynamicForm onSubmit={submitTodos} />
      </Modal>
      <List
        size="large"
        header={<div>Active Todos</div>}
        footer={
          <div>
            <div>
              <ButtonGroup>
                {todos.length > 0 && (
                  <Button
                    type="primary"
                    disabled={loading}
                    onClick={(event: MouseEvent<HTMLButtonElement>) => {
                      onCompleteTodos(todos);
                    }}
                  >
                    <Icon type="check" />
                    Check All
                  </Button>
                )}
                <Button
                  type="default"
                  disabled={loading}
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  Add New
                  <Icon type="file-add" />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        }
        bordered
        dataSource={todos}
        renderItem={(item: Todo) => (
          <List.Item>
            <Checkbox
              key={item.id}
              disabled={loading}
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                onCompleteTodos([item]);
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

export default Todos;
