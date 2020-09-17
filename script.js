const inputEl = document.getElementById("input-todo");
const btnAddEl = document.getElementById("create");
const todolistEl = document.getElementById('list-group');
var todoList = [];
const geraId = () => {return Math.floor(Math.random() * 1000)}



function createTodo(){
    if(inputEl.value == '') return
    let todo = {
        id: geraId(),
        conteudo: inputEl.value
    }
    todoList.push(todo);
    inputEl.value = '';
    renderTodo();
}
function deleteTodo(key) {  
    todoList.forEach((conteudo,i) => {
        if(conteudo.id == key){
            todoList.splice(i,1);
        }
    })
    renderTodo();
}
function updateTodo(newValue,key){  
    todoList.forEach((conteudo) => {
        if(conteudo.id == key){
            conteudo.conteudo = newValue.innerText;
        }
    })
}
function renderTodo(){
    var list = "";
    todoList.forEach((conteudo) => {
        list +=  `<li key="${conteudo.id}" class="d-flex justify-content-between list-group-item bg-light ">
                    <a contentEditable="true" onBlur="updateTodo(this,${conteudo.id})" id="conteudo" class="flex-grow-1 ">${conteudo.conteudo}</a>
                    <button class="btn btn-danger" onClick="deleteTodo(${conteudo.id})">Deletar</button>   
                    </li>
                    `
            
    })
    todolistEl.innerHTML = list;       
    
}

for(let i = 0; i < 10; i++){
    let todo = {id:geraId(), conteudo:i }
    todoList.push(todo);
}
renderTodo();



