class Despesa extends Store { // classe Despesa extende do Store
    constructor() { 
        super();  // herda todas os metodos vindos do store
    }

    _obterTrDados(item) { // item 
        let template = document.createElement('template') // cria um elemento chamado template onde recebera todoa  estrutura do html quando for construido na tabela
        template.innerHTML = `   
        <tr>   
            <td class="desc">${item.descricao}</td> 
            <td class="vl">${item.valor}</td>
            <td class="editar">Editar</td>
            <td class="excluir">Excluir</td>
        </tr>`    // item.descricao e item.valor apresenta os valores cadastrados armazendaos vindos do Store

        let frag = template.content 

        let desc = frag.querySelector('.desc') // variavel recebe .desc para identificar o campo que será editado utilizar no editar
        let vl = frag.querySelector('.vl') // variavel recebe .vl para identificar o campo que será utilizar no editar
        let btnEditar = frag.querySelector('.editar') // variavel recebe .editar para utilizar no editar
        let btnExcluir = frag.querySelector('.excluir') // variavel recebe .exluir para utilizar no editar

        let superThis = this

        btnExcluir.addEventListener('click', function (e) {
            // após clicar no botão excluir chama o metodo excluirIndex que recebera o valor do id a ser excluido
            superThis.excluirIndex = item.key
            despesa.obterTrsDados()  // atualiza a lista das despesas
        })

        btnEditar.addEventListener('click', function (e) {
            desc.setAttribute('contenteditable', true)
              // quando clicado, desabilita contente, para que o campo possa ser editado
            vl.setAttribute('contenteditable', true)
              // quando clicado, desabilita contente, para que o campo possa ser editado
            desc.focus()  // mantem o foco do cursor no campo descrição para editar.
        })

        desc.addEventListener('keyup', function (e) {  // quando acionado o botao editar, se optar em somente editar o campo descrição, após pressionar a tecla enter e soltar o novo valor do campo será armazenado 
            if(e.key == "Enter") {
                let atual = superThis.getOne(item.key) //pega o valor do o id que será editado
                atual.descricao = this.textContent // recebe o valkor atual campo item.descricao
                superThis.editarIndex(item.key, atual) // armazena o valor atual do campo editado e seu id, e será enviado ao editarIndex para ser editado
                despesa.obterTrsDados() // atualiza tabela após edição
            }
        })

        vl.addEventListener('keyup', function (e) { // quando acionado o botao editar, se optar em somente editar o campo valor, após pressionar a tecla enter e soltar o novo valor do campo será armazenado 
            if(e.key == "Enter") {
                let atual = superThis.getOne(item.key)  // pega o valor do o id que será editado
                atual.valor = this.textContent // recebe o valkor atual campo item.valor
                superThis.editarIndex(item.key, atual)   // quando clicado, desabilita contente, para que o campo possa ser editado
                despesa.obterTrsDados() // atualzia tabela após edição
            }
        })

        return frag // retorna o template com a atualização dos campos para a exibição
    }

    obterTrsDados() {  //  Serve para atualizar a tabela e listar os itens
        tbody.innerHTML = ""
        let t = this.todos
        for (let key in t) {  
            let item = t[key]
            item.key = key
            let htmlElement = this._obterTrDados(item)
            tbody.appendChild(htmlElement)
        }
    }
}
