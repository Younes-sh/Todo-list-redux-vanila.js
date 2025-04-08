const textInput = document.getElementById('#todo-input');
const addButton = document.getElementById('#add-todo');
const todoList = document.getElementById('#todo-list');


todoList.innerText = `
    <li>
        <p>Todo1</p>
        <button class="delete-todo">Delete</button>
    </li>
`