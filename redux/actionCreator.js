// ./redux/actionCreator.js
import { addTodoAction, completedTodoAction, deleteTodoAction, setCompletedDateAction } from "./action.js";

export const addTodoCreator = (title) => ({
  type: addTodoAction,
  title
});

export const completedCreator = (id) => ({
  type: completedTodoAction,
  id
});

export const deleteTodoCreator = (id) => ({
  type: deleteTodoAction,
  id
});

export const setCompletedDateCreator = (id, date) => ({
  type: setCompletedDateAction,
  id,
  date
});