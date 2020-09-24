import { saveLocalStorage } from "./localStorage.js";
import { todoFactory } from "./todo-factory.js";
import {todoList} from "./index.js";

const todolistEl = document.getElementById("list-group");
const restanteEL = document.getElementById("total");
const todoEmptyElement = `<div><p class="todo-empty">Sem to-do</p></div>`

//Recebe um texto do formulario e cria um todo com a fabrica, faz o envio do todo para a lista e o localStorage
function createTodo(text) {
    let todo = todoFactory(text);
    todoList.push(todo);
    saveLocalStorage(todoList);
    renderTodo();
}
//Recebe um key(id), remove o TO-DO após achar o INDEX na lista, remove do localStorage
function deleteTodo(id) {
    let index = getTodoIndex(id);
    todoList.splice(index, 1);
    saveLocalStorage(todoList);
    renderTodo();
}
//Pega o index da lista de um determinado ID
function getTodoIndex(id) {
    let index = todoList.findIndex(function (item) {
        return item.id === id;
    });
    return index;
}
//recebe o novo valor para atualizar e o id
function updateTodo(novoValor, id) {
    let index = getTodoIndex(id);
    todoList[index].text = novoValor.innerText;
    //localStorage.setItem('todo',JSON.stringify(todoList));
    saveLocalStorage(todoList);
    renderTodo();
}
//Coloca um array vazio no todoList e salva no localStorage
function deleteAllTodos() {
    todoList = [];
    saveLocalStorage(todoList);
    //renderTodo();
}
//Verifica se a lista de TO-DO está vazia e depois escolhe o que vai renderizar
function renderTodo() {
    if (todoList.length == 0) {
        todolistEl.innerHTML = todoEmptyElement;
    } else {
        todolistEl.innerHTML = '';
        todoList.forEach((todo) => {
            let liElement = document.createElement('li');
            let aElement = document.createElement('a');
            let buttonDeleteElement = document.createElement('button');

            liElement.setAttribute('class', 'todoItem');
            liElement.setAttribute('id', 'todo');

            aElement.setAttribute('id', 'conteudo');
            aElement.setAttribute('contentEditable', 'true');
            aElement.innerText = todo.text;
            aElement.addEventListener('blur', () => updateTodo(aElement, todo.id));

            buttonDeleteElement.setAttribute('id', 'deleteTodo');
            buttonDeleteElement.innerText = "Deletar";
            buttonDeleteElement.addEventListener('click', () => deleteTodo(todo.id));

            liElement.appendChild(aElement);
            liElement.appendChild(buttonDeleteElement);
            todolistEl.appendChild(liElement);
        });
    }
    restanteEL.innerHTML = todoList.length;
}
export{createTodo,updateTodo,deleteTodo,deleteAllTodos,renderTodo};