
const btnAddEl = document.getElementById("create");
const todolistEl = document.getElementById("list-group");
const todoEmpty = `<div><p class="todo-empty">Sem to-do</p></div>`
const restanteEL = document.getElementById("total");
const deleteALL = document.getElementById("delete-all");
const todoForm = document.getElementById("form");
var todoList = JSON.parse(localStorage.getItem("todo"));


todolistEl.innerHTML = todoEmpty;

if (todoList == null) {
    todoList = [];
}else{
    renderTodo();
}

todoForm.addEventListener('submit', (e) => {
    const inputEl = document.getElementById("input-todo");
    e.preventDefault();
    createTodo(inputEl.value);
    inputEl.value = '';
})

function todoFactory(conteudo){
    let id = (Math.random() *100);
    return {
        id,
        conteudo,
        marked:false,
    }
}

function createTodo(text){
    let todo = todoFactory(text);
    todoList.push(todo);
    localStorage.setItem('todo',JSON.stringify(todoList));
    renderTodo();
}
function deleteTodo(key) {
    let index = todoList.findIndex(function(item) {
        return item.id === key;
    });
    todoList.splice(index,1);
    localStorage.setItem('todo',JSON.stringify(todoList));
    renderTodo();
}
function updateTodo(novoValor,key){ 
    let index = todoList.findIndex(function(item) {
        return item.id === key;
    });
    todoList[index].conteudo = novoValor.innerHTML;
    localStorage.setItem('todo',JSON.stringify(todoList));
}
function deleteAllTodos(){
    todoList.length = 0;
    localStorage.setItem('todo',JSON.stringify(todoList));
    renderTodo();
}


function renderTodo(){
    if(todoList.length == 0){
        todolistEl.innerHTML = todoEmpty;
        restanteEL.innerHTML = 0;
    }else { 
       todolistEl.innerHTML = '';
       
        todoList.forEach((conteudo) => {
            let liElement = document.createElement('li');
            let aElement = document.createElement('a');
            let buttonDeleteElement =document.createElement('button');
        
            liElement.setAttribute('class','todoItem');
            liElement.setAttribute('id','todo');
        
            aElement.setAttribute('id','conteudo');
            aElement.setAttribute('contentEditable','true');
            aElement.innerText = conteudo.conteudo;
            aElement.addEventListener('blur', () => {
                updateTodo(aElement,conteudo.id);
            })
        
            buttonDeleteElement.setAttribute('id','deleteTodo');
            buttonDeleteElement.innerText = "Deletar";
        
            buttonDeleteElement.addEventListener('click', () =>{
                deleteTodo(conteudo.id);
            });
        
            
        
            liElement.appendChild(aElement);
            liElement.appendChild(buttonDeleteElement);
            todolistEl.appendChild(liElement);
        })
            
        
        restanteEL.innerHTML = todoList.length; 
    } 
}
