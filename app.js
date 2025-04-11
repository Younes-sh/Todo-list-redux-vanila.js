const textInput = document.querySelector('#todo-input');
const addButton = document.querySelector('#addTodo');
const todoList = document.querySelector('#todo-list');
const removBtn = document.querySelector('#remove-todo');

// import { addTodo, completTodo, deleteTodo} from './Redux/actions.js';
// import { addTodoCreator, completCreator, deleteTodoCreator} from './Redux/creators.js';

const todoReducer = (state = [], action) => {
    switch(action.type){
        case "ADD_TODO": {
            const newState = [...state];
            const newTitle = action.title;
            const newTodo = {
                id: newState.length + 1,
                title: newTitle,
                isCompleted: false
            }
            newState.push(newTodo)
            return newState;
        }
        case "COMPLET_TODO":{
            
        }
        case "DELETE_TODO":{
           
        }
        default:
            return state;
    }
}


const store = Redux.createStore(todoReducer);


addButton.addEventListener('click', () => {
    const titleTodo = textInput.value;
    store.dispatch({type: "ADD_TODO", title: titleTodo});
    textInput.value = '';
    console.log(store.getState())
});

console.log(Redux)