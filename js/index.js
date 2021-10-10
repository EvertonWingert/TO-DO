import { todoFactory } from "./todoFactory.js";

const todoFormElement = document.getElementById("form");
const deleteALLElement = document.getElementById("delete-all");
const todolistEl = document.getElementById("list-group");
const restanteEL = document.getElementById("total");
const todoEmptyElement = `<div><p class="todo-empty">Sem to-do</p></div>`

var todoList = getLocalStorage();

renderTodo();

todoFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputEl = document.getElementById("input-todo");
    create(inputEl.value);
    inputEl.value = '';
})

deleteALLElement.addEventListener('click', () => {
    todoList = [];
});


function getLocalStorage() {
    return JSON.parse(localStorage.getItem("todo")) ?? [];
}

function saveTodoInLocalStorage(list) {
    localStorage.setItem('todo', JSON.stringify(list));
}

function create(text) {
    const todo = todoFactory(text);
    todoList.push(todo);
    saveTodoInLocalStorage(todoList);
    renderTodo();

}

function destroy(id) {
    const index = findTODO(id);
    todoList.splice(index, 1);
    saveTodoInLocalStorage(todoList);
    renderTodo();

}

function findTODO(id) {
    return todoList.findIndex(function (item) {
        return item.id === id;
    });
}

function update(todo, id) {
    let index = findTODO(id);
    todoList[index].text = todo.innerText;
    saveTodoInLocalStorage(todoList);
    renderTodo();
}

function renderTodo() {

    if (todoList.length == 0) {
        todolistEl.innerHTML = todoEmptyElement;
        return;
    }

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
        aElement.addEventListener('blur', () => update(aElement, todo.id));

        buttonDeleteElement.setAttribute('id', 'deleteTodo');
        buttonDeleteElement.innerText = "Deletar";
        buttonDeleteElement.addEventListener('click', () => destroy(todo.id));

        liElement.appendChild(aElement);
        liElement.appendChild(buttonDeleteElement);
        todolistEl.appendChild(liElement);
    });

    restanteEL.innerHTML = todoList.length;
}



