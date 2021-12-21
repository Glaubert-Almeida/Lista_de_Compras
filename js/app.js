let produtos = []
let countProdutos = produtos.length

const buscar = () => {
    produtos = JSON.parse(localStorage.getItem("produtos"))
    if(produtos != null)
        consultarProdutos(produtos)
}

const salvar = () => {
    if(verificaCamposNaoPreenchidos()){
    Swal.fire('Campo não preenchido.')
        return
    }
    let itemProduto = {
        id: ++countProdutos,
        produto: document.querySelector('#produto').value,
        valor: document.querySelector('#valor').value,
        qtde: document.querySelector('#qtde').value
    }

    if(document.querySelector('#idProduto').value !== ""){
        editar(itemProduto, document.querySelector('#idProduto').value)
    }else{
        cadastrar(itemProduto)
    }
    
}

const cadastrar = (produto) => {
    if(produtos == null) {
        produtos = []
    }
    produtos.push(produto)
    produtos.sort(function (a, b) {
	
        return (a.produto > b.produto) ? 1 : ((b.produto > a.produto) ? -1 : 0);
     
    });
    localStorage.setItem("produtos", JSON.stringify(produtos))
    buscar()
    limparCamposCadastro()
}

const consultarProdutos = (produtos) => {
    let mostrarLinhaProduto = ''
    if(produtos.length === 0){
        document.querySelector('#listaProdutos').innerHTML = `<tr><td colspan="5" class="text-center">Não há itens na lista...</td></tr>`
        return
    }
    produtos.forEach(produto => mostrarLinhaProduto += construirLinha(produto))
    document.querySelector('#listaProdutos').innerHTML = mostrarLinhaProduto
}

const construirLinha = (produto) => {
    return `<tr>
                <td>${produto.produto}</td>
                <td>${produto.valor}</td>
                <td>${produto.qtde}</td>
                <td>${produto.valor * produto.qtde}</td>
            </tr>`
}

const verificaCamposNaoPreenchidos = () => {
    return document.querySelector('#produto').value == "" ||
     document.querySelector('#valor').value == "" ||
     document.querySelector('#qtde').value == ""
 }
 
 const limparCamposCadastro = () => {
     document.querySelector('#produto').value = ""
     document.querySelector('#valor').value = ""
     document.querySelector('#qtde').value = ""
     document.querySelector('#idProduto').value = ""
     document.querySelector("#boxCadastro h2").textContent = "Cadastrar produto"
     document.querySelector("#novo").innerHTML = `<i class="fas fa-plus-square"></i> Novo Produto`
     document.querySelector('#produto').focus()
 }

 const limparListaProdutos = () => {
            localStorage.removeItem("produtos")
            produtos = []
            consultarProdutos(produtos)
        }

window.addEventListener("load", buscar)
novo.addEventListener("click", salvar)
limparLista.addEventListener("click", limparListaProdutos)