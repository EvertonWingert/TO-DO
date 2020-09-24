//salva no localStorage
function saveLocalStorage(list) {
    localStorage.setItem('todo', JSON.stringify(list));
}
//Retorna o conteudo do localStorage
function getLocalStorage() {
    if (localStorage.getItem("todo")) {
        return JSON.parse(localStorage.getItem("todo"));
    }

}
export {saveLocalStorage, getLocalStorage};