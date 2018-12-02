
class Store {

  constructor() {
    this.store = "despesas"; // nome criado nos storage onde vai ser armazenado tudo o que for salvo
  }

  _parse(stringParaConverterEmObjeto) {
    return JSON.parse(stringParaConverterEmObjeto); // retorna um objeto
  }

  _stringify(objetoParaConverterEmString) {
    return JSON.stringify(objetoParaConverterEmString); // retorna uma string
  }

  get todos () {
    return this._parse(localStorage.getItem(this.store)) || []; // retorna um objeto do local storage
  }

  set novoItem(item) {  // cria um novo registro
    let todos = this.todos // chama "get todos"
    let res = todos.push(item); // recebe os valores para cadastrar
    localStorage.setItem(this.store, this._stringify(todos)); // salva no localstorage para que não seja apagado quando for recarregada a pagina e covertendo numa string
    return res; // retorna todos os valores salvos
  }

  editarIndex(idx, value) {  // recebe o id e os novos valores que forem editados
    let todos = this.todos
    let res = (todos[idx] = value);  // recebe a posição e o nova valor para ser enserido no local storage
    localStorage.setItem(this.store, this._stringify(todos)) // manda para o localstorage após a edição para correção convertendo em string
    return res
  }

  getOne (idx) {  // retorna os valores do storage com o seu id
    return this._parse(localStorage.getItem(this.store))[idx] || []
  }

  set excluirIndex(idx) { // recebe o id para poder excluir o item que foi selecionado
    let todos = this.todos
    let res = todos.splice(idx, 1); // serve para remover o numero expecifico da possição a ser excluida
    localStorage.setItem(this.store, this._stringify(todos)); // exclui do localstorage
    return res;
  }
}
