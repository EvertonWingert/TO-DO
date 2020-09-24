import { getLocalStorage } from "./localStorage.js";
import { createTodo,deleteAllTodos,renderTodo } from "./todo.js";
import {firebaseConfig} from "./db/firebaseConfig";

const todoFormElement = document.getElementById("form");
const deleteALLElement = document.getElementById("delete-all");

firebase.initializeApp(firebaseConfig);

var todoList = getLocalStorage();
renderTodo();

//Recebendo dados do formulario para  criar um TO-DO
todoFormElement.addEventListener('submit', (e) => {
    let inputEl = document.getElementById("input-todo");
    e.preventDefault();
    createTodo(inputEl.value);
    inputEl.value = '';
})

deleteALLElement.addEventListener('click', () => {deleteAllTodos()});


export {todoList};