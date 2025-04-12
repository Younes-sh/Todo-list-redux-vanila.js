const textInput = document.querySelector('#todo-input');
const addButton = document.querySelector('#addTodo');
const todoList = document.querySelector("#todoList");
const removBtn = document.querySelector("#remove-todo");
const alertInfo = document.querySelector(".alert");

function todoReducer(state = [], action) {
  switch (action.type) {
    case "ADD_TODO": {
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
    case "COMPLETED": {
    }
    case "DELETE": {
    }
    default:
      return state;
  }
}

const store = Redux.createStore(todoReducer);
// const render = () => {};

const generateElement = (title) => {
  return `
    <li class="item ">
      <p>${title}</p>
      <button class="delete-todo">Delete</button>
    </li>
  `;
};

const renderUI = () => {
  const todos = store.getState();
  todoList.innerHTML = ""; // Clear the list before rendering
  todos.map((todo) => {
    todoList.insertAdjacentHTML("beforeend", generateElement(todo.title));
  });
};

renderUI();
store.subscribe(renderUI);


function creatTodo() {
  const titleTodo = textInput.value;
  store.dispatch({ type: "ADD_TODO", title: titleTodo });
  alertInfo.innerHTML = "";
  textInput.value = "";
  textInput.focus();
  console.log(store.getState());
}
addButton.addEventListener("click", () => {
  // if it's empty, alert the user
  if (textInput.value === "") {
    alertInfo.innerHTML = "Please, add a todo!";
  } else {
    creatTodo();
  }
});
windows.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && textInput.value != "") {
    creatTodo();
  } else {
    alertInfo.innerHTML = "Please, add a todo!";
  }
});


