const inputEl = document.getElementById("input-todo");
const btnAddEl = document.getElementById("create");
var todolistEl = document.getElementById("list-group");
const todoEmpty = `<div><p class="todo-empty">Sem to-do</p></div>`
todolistEl.innerHTML = todoEmpty;
var todoList = [];


const geraId = () => {
    return Math.random() *100;

}

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
    
    console.log(key)
    
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
    if(todoList.length == 0){
        todolistEl.innerHTML = todoEmpty;
        
    }else { 
        var list = "";
        todoList.forEach((conteudo) => {
            list +=  `<li key="${conteudo.id}" class="todoItem">
                        <a contentEditable="true" onBlur="updateTodo(this,key)" id="conteudo">${conteudo.conteudo}</a>
                        <button onClick="deleteTodo(${conteudo.id})"> Deletar </button>   
                    </li>
                        `
                
        })
        todolistEl.innerHTML = list;
    }    
    
}

/*
for(let i = 0; i < 30; i++){
    let todo = {id:geraId(), conteudo:i }
    todoList.push(todo);
}
renderTodo();
*/
