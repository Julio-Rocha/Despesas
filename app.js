
const descricao = document.querySelector("#txtDescricao")//Recebe o valor do teclado no campo Descrição
const valor = document.querySelector("#txtValor")//Recebe o valor do teclado no campo Valor
const btSalvar = document.querySelector("#btnSalvar")//Função que faz o botão salvar os dados digitados
const tbody = document.querySelector("#tblListar > tbody") // É listado dentro do tbody os dados salvos

let despesa = new Despesa() // cria uma nova despesa

btSalvar.addEventListener('click', function (e) {// Cria a função que salva os dados após o click no botão salvar.
    const vlDescricao = descricao.value // recebe o valor da constante descrição 
    const vlValor = valor.value // recebe o valor da constante valor
    if(!vlDescricao || !vlValor) {// Os campos Descrição e Valor em branco não permitem que sejam salvos dados.
        alert("Preencha os dois campos")// Assim emite-se um alerta na tela para que o usuário preencha-os. 
    } else {
        despesa.novoItem  = {  // Cria um novo item de despesa que será armazenado o seu valor nos campos descrisão e valor, onde chama o metodo de novo item para poder ser inserido os valores . 
            descricao: vlDescricao,
            valor: vlValor
            
        }
        despesa.obterTrsDados() // atualiza a tabela após ser cadastrado os campos

    }
})

window.onload = despesa.obterTrsDados() // O window.onload só é disparado quando todo o conteúdo é carregado. 


