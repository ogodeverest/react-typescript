import React, { FunctionComponent, Fragment } from "react";
import { Input, Form, Button, Icon } from "antd";
import {
  withFormik,
  Form as FormikForm,
  Field,
  FieldArray,
  FieldProps
  
} from "formik";
import styled from "styled-components";
import * as Yup from "yup";
interface Props {
  values: any;
  errors: any;
  touched: any;
  isSubmitting: boolean;
}

const InlineInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .ant-row {
    width: 90% !important;
  }
`;

const InitialForm: FunctionComponent<Props> = ({
  values,
  errors,
  touched,
  isSubmitting
}) => {
  const todoList = values.todos.filter((todo: any) => {
    return todo.title != "";
  });

  return (
    <Fragment>
      <FormikForm>
        <FieldArray
          name="todos"
          render={({ insert, remove, push }) => (
            <div>
              {values.todos.length > 0 &&
                values.todos.map((todo: any, index: any) => (
                  <InlineInput key={index}>
                    <Button
                      type="primary"
                      shape="circle"
                      icon="minus"
                      onClick={() => remove(index)}
                      disabled={values.todos.length == 1}
                    />
                    <Form.Item
                      validateStatus={
                        errors.todos &&
                        errors.todos[index] &&
                        touched.todos &&
                        touched.todos[index]
                          ? "error"
                          : "success"
                      }
                      help={
                        errors.todos &&
                        errors.todos[index] &&
                        touched.todos &&
                        touched.todos[index]
                          ? errors.todos[index].title
                          : ""
                      }
                      hasFeedback={true}
                    >
                      <Field
                        name={`todos.${index}.title`}
                        render={({ field }: FieldProps) => (
                          <Input
                            {...field}
                            prefix={
                              <Icon
                                type="file-done"
                                style={{ color: "rgba(0,0,0,.25)" }}
                              />
                            }
                            type="text"
                            placeholder="Title..."
                          />
                        )}
                      />
                    </Form.Item>
                  </InlineInput>
                ))}
              <Button
                type="dashed"
                block
                onClick={() => push({ title: "" })}
                style={{ marginBottom: ".4em" }}
              >
                <Icon type="plus-circle" />
                Add
              </Button>{" "}
              <Button
                type="primary"
                block
                loading={isSubmitting}
                htmlType="submit"
                disabled={!!errors.todos || todoList.length == 0}
              >
                {isSubmitting ? (
                  "Loading"
                ) : (
                  <Fragment>
                    <Icon type="check" />
                    Done
                  </Fragment>
                )}
              </Button>
            </div>
          )}
        />
      </FormikForm>
    </Fragment>
  );
};

const DynamicForm = withFormik({
  mapPropsToValues() {
    return {
      todos: []
    };
  },
  validationSchema: Yup.object().shape({
    todos: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string()
            .min(2, "The title is too short")
            .required("The title is required") // these constraints take precedence
        })
      )
      .required("Must have todos") // these constraints are shown if and only if inner constraints are satisfied
  }),
  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    setSubmitting(true);
    setTimeout(() => {
      console.log(values, props);
      setSubmitting(false);
      resetForm();
    }, 3000);
  }
})(InitialForm);

export default DynamicForm;
