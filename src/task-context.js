import "./App.css";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardText,
  Button,
  Input,
  Form,
  FormGroup,
  InputGroup,
  CardTitle,
  // Tooltip
} from "reactstrap";
// import PropTypes from 'prop-types';
import data from "./taskData.json";
import { FaRegEdit, FaRegTrashAlt, FaRegSave, FaTimes } from "react-icons/fa";

export function TodoList() {
  const [todos, setTodos] = useState(data); //to leave blank, use empty array []
  const [inputValue, setInputValue] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  // const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const previousTaskId = todos[todos.length - 1];
      const newTaskId = previousTaskId ? previousTaskId.taskId + 1 : 1;

      const newTodo = {
        taskId: newTaskId, //issue with id duplication, need another method to do so
        text: inputValue,
        completed: false,
        datetimeCreated: new Date().toLocaleString(),
      };

      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleDeleteTodo = (taskId) => {
    const updatedTodos = todos.filter((todo) => todo.taskId !== taskId);
    setTodos(updatedTodos);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.taskId === taskId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleEditTodoStart = (taskId) => {
    const todoBeginEdit = todos.find((todo) => todo.taskId === taskId);
      setEditingTaskId(taskId);
      setEditedTaskText(todoBeginEdit.text);
  };

  const handleEditTodoSave = (taskId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.taskId === taskId) {
        return {
          ...todo,
          text: editedTaskText.trim(),
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingTaskId(null);
  };

  const handleEditTodoCancel = () => {
    setEditingTaskId(null);
  };

  const handleEditedTaskTextChange = (e) => {
    setEditedTaskText(e.target.value);
  };

  const handleRemoveCompletedTasks = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  };

  const filteredTasks = showCompleted ? todos.filter((todo) => todo.completed) : todos;

  // const toolTipToggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      <div>
        <h2>To-do List</h2>
        <Form>
          <InputGroup>
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter a new task..."
              name="taskItem"
            />
            <Button className="addTaskbut" onClick={handleAddTodo}>
              + Add Task
            </Button>
          </InputGroup>
        </Form>
        <br />
        <div className="completeTasksBut">
          <Button onClick={() => setShowCompleted(!showCompleted)}>
            {showCompleted ? "Show All Tasks" : "Show Completed"}
          </Button>
          {showCompleted && (
            <Button onClick={handleRemoveCompletedTasks}>
              Remove Completed
            </Button>
          )}
          <br />
        </div>
        <ul>
          {filteredTasks.map((todo) => (
            <Card key={todo.taskId} style={{ marginTop: "10px " }}>
              <CardBody
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.taskId)}
                    name="taskItem"
                  />
                  {editingTaskId === todo.taskId ? (
                    <Input
                      type="text"
                      value={editedTaskText}
                      onChange={handleEditedTaskTextChange}
                      name="taskItem"
                    />
                  ) : (
                    <div>
                      <CardTitle
                        style={{
                          wordWrap: "break-word",
                          whiteSpace: "pre-wrap",
                          overflowWrap: "break-word",
                          textDecoration: todo.completed
                            ? "line-through"
                            : "none",
                          marginBottom: "10px",
                        }}
                      >
                        {todo.text}
                      </CardTitle>
                      <CardText>
                        <small className="taskCreated">
                          Created on {todo.datetimeCreated}
                        </small>
                      </CardText>
                    </div>
                  )}
                </FormGroup>
                {editingTaskId === todo.taskId ? ( //reveal save and cancel options if edit triggered
                  <div className="task-buttons">
                    <Button
                      id="saveConfirmFunc"
                      onClick={() => handleEditTodoSave(todo.taskId)}
                    >
                      <FaRegSave />
                    </Button>
                    {/* <Tooltip
                      isOpen={tooltipOpen}
                      placement="top"
                      target="saveConfirmFunc"
                      toggle={toolTipToggle}
                      ></Tooltip> */}
                    <Button id="cancelFunc" onClick={handleEditTodoCancel}>
                      <FaTimes />
                    </Button>
                    {/* <Tooltip
                      isOpen={tooltipOpen}
                      placement="top"
                      target="cancelFunc"
                      toggle={toolTipToggle}
                      >
                        Cancel
                      </Tooltip> */}
                  </div>
                ) : (
                  <div className="task-buttons">
                    <Button
                      id="editFunc"
                      onClick={() => handleEditTodoStart(todo.taskId)}
                    >
                      <FaRegEdit />
                    </Button>
                    {/* <Tooltip
                      isOpen={tooltipOpen}
                      placement="top"
                      target="editFunc"
                      toggle={toolTipToggle}
                      >
                      Edit task
                    </Tooltip> */}
                    <Button
                      id="deleteFunc"
                      onClick={() => handleDeleteTodo(todo.taskId)}
                    >
                      <FaRegTrashAlt />
                    </Button>
                    {/* <Tooltip
                      isOpen={tooltipOpen}
                      placement="top"
                      target="deleteFunc"
                      toggle={toolTipToggle}
                      >
                      Delete task
                    </Tooltip> */}
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </ul>
      </div>
    </>
  );
}
