const inputEl = document.getElementById("input-todo");
const btnAddEl = document.getElementById("create");
var todolistEl = document.getElementById("list-group");
const todoEmpty = `<div><p class="todo-empty">Sem to-do</p></div>`
const restanteEL = document.getElementById("total");
todolistEl.innerHTML = todoEmpty;
var todoList = [];


function todoFactory(conteudo){
    let id = (Math.random() *100);
    return {
        id,
        conteudo
    }
}
function createTodo(){
    if(inputEl.value == '') return
    todoList.push(todoFactory(inputEl.value));
    inputEl.value = '';
    renderTodo();
}
function deleteTodo(key) {
    let index = todoList.findIndex(function(item) {
        return item.id === key;
    });
    todoList.splice(index,1);
    renderTodo();
}
function updateTodo(novoValor,key){ 
    let index = todoList.findIndex(function(item) {
        return item.id === key;
    });
    todoList[index].conteudo = novoValor.innerHTML;
}

function renderTodo(){
    if(todoList.length == 0){
        todolistEl.innerHTML = todoEmpty;
        restanteEL.innerHTML = 0;
    }else { 
        var list = "";
        todoList.forEach((conteudo) => {
            
            list +=  `<li key="${conteudo.id}" class="todoItem" id="todo">
                        <a contentEditable="true" onBlur="updateTodo(this,${conteudo.id})" id="conteudo">${conteudo.conteudo}</a>
                        <button onClick="deleteTodo(${conteudo.id})" id="deleteTodo"> Deletar </button>   
                      </li>
                        `
        })
        todolistEl.innerHTML = list;
        restanteEL.innerHTML = todoList.length; 
    } 
}