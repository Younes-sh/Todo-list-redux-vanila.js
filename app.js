const textInput = document.querySelector('#todo-input');
const addButton = document.querySelector('#addTodo');
const todoList = document.querySelector("#todoList");
const alertInfo = document.querySelector(".alert");

import { addTodoAction, completedTodoAction, deleteTodoAction } from "./redux/action.js";
import { addTodoCreator, completedCreator, deleteTodoCreator } from "./redux/actionCreator.js";

function todoReducer(state = [], action) {
  switch (action.type) {
    case addTodoAction: {
      const newState = [...state];
      const newTitle = action.title;
      const newTodo = {
        id: newState.length + 1,
        title: newTitle,
        isCompleted: false,
      };
      newState.push(newTodo);
      return newState;
    }
    case completedTodoAction: {
      const newState = [...state];
      newState.forEach((todo) => {
        if (todo.id === action.id) {
          todo.isCompleted = !todo.isCompleted;
        }
      });
      return newState;
    }
    case deleteTodoAction: {
      const newState = state.filter((todo) => todo.id !== action.id);
      return newState;
    }
    default:
      return state;
  }
}

const store = Redux.createStore(todoReducer);

const generateElement = (title, id, isCompleted) => {
  return `
    <li class="item ${isCompleted && "completed" }"
      data-id="${id}"
    >
      <p>${title}</p>
      <button id="deleteTodo">Delete</button>
    </li>
  `;
};

const renderUI = () => {
  const todos = store.getState();
  todoList.innerHTML = ""; // Clear the list before rendering
  todos.map((todo) => {
    todoList.insertAdjacentHTML(
      "beforeend",
      generateElement(todo.title, todo.id, todo.isCompleted));
  });
};

renderUI();
store.subscribe(renderUI);

todoList.addEventListener("click", (event) => {
  if (event.target.id === "deleteTodo") {
    const todoIdToDelete = parseInt(event.target.parentNode.getAttribute('data-id'));
    store.dispatch(deleteTodoCreator(todoIdToDelete));
  } else if (event.target.tagName === "LI") {
    const todoIdToToggle = parseInt(event.target.getAttribute('data-id'));
    store.dispatch(completedCreator(todoIdToToggle));
  }
});


function creatTodo() {
  const titleTodo = textInput.value;
  store.dispatch(addTodoCreator(titleTodo));
  alertInfo.innerHTML = "";
  textInput.value = "";
  textInput.focus();
  console.log(store.getState());
}
addButton.addEventListener("click", () => {
  // if it's empty, alert the user
  if (textInput.value === "") {
    alertInfo.innerHTML = "Please, add a todo!";
    textInput.focus();
  } else {
    creatTodo();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (textInput.value === "") {
      alertInfo.innerHTML = "Please, add a todo!";
      textInput.focus();
    } else {
      creatTodo();
    }
  }
});