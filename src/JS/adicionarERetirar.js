let itens = [
    {
      id: 0,
      nome: 'hamburguer',
      valor: 25,
      img: '../img/hamburguer.png',
      quantidade: 0
    },
    {
      id: 1,
      nome: 'sorvete',
      valor: 5,
      img: '../img/sorvete.png',
      quantidade: 0
    },
    {
      id: 2,
      nome: 'batata frita',
      valor: 3,
      img: '../img/batatas-fritas.png',
      quantidade: 0
    },
    {
      id: 3,
      nome: 'bebida',
      valor: 2,
      img: '../img/refrigerantes.png',
      quantidade: 0
    },

]

/////////////////////LOJA/////////////////////////////////


function inicializarLoja(){
let produtosContainer = document.querySelector('#produtosParaSelecao')
itens.map((val) => {
  produtosContainer.innerHTML += `
    <div id="produto-sozinho">
      <img src="${val.img}" />
      <p>${val.nome}</p>
      <p class="valorProduto">R$${val.valor},00</p>
      <a key="${val.id}" href="#">ADICIONAR</a>
    </div>
  `
})

}

inicializarLoja()

//////////////////////CARRINHO////////////////////////////
function mostrarCarrinho(){
let carrinho =  document.querySelector('#carrinhoDeItens')

if(carrinho.style.display === 'none'){
  carrinho.style.display = 'block'
}else{
  carrinho.style.display = 'none'
}
}

let carrinhoContainer = document.querySelector('#carrinhoDeItens')

function atualizarCarrinho(){
carrinhoContainer.innerHTML = ''

totalCarrinho = 0; // Reinicia o total do carrinho
quantidadeTotalDeItens = 0

carrinhoContainer.innerHTML += `
<div>
    <h2>CARRINHO:</h2>
</div>
`

itens.map((val) => {
  if(val.quantidade > 0){

    let totalItem = val.quantidade * val.valor; // Calcula o total para este item
    totalCarrinho += totalItem; // Adiciona ao total do carrinho
    quantidadeTotalDeItens += val.quantidade
    carrinhoContainer.innerHTML += `
      <div id="carrinho-produto-sozinho">
        <img src="${val.img}" />
        <br>
        <p>| ${val.nome} | <br> Qunt: ${val.quantidade}x 
        <br> Total: R$${totalItem},00</p> 
        <a key="${val.id}" href="#" class="retirar">RETIRAR</a>   
      </div>
  `
  }
})

carrinhoContainer.innerHTML += `
  <div id="valorTotalCarrinho">
    <h3>
      Total de itens: ${quantidadeTotalDeItens}
      <br>
      Valor total da compra: R$${totalCarrinho},00
    </h3>
  </div>
`;


// Adiciona o evento de retirada após atualizar o carrinho
let linksRetirada = document.querySelectorAll('.retirar');
linksRetirada.forEach(link => {
  link.addEventListener('click', function(event){
    event.preventDefault();
    let chaveKey = this.getAttribute('key');
    itens[chaveKey].quantidade--;
    atualizarCarrinho();
  });
});

return totalCarrinho
}

let link = document.getElementsByTagName('a')

for(let i = 0; i < link.length; i++){
link[i].addEventListener('click', function(){
  let chaveKey = this.getAttribute('key')
  itens[chaveKey].quantidade++
  itens[chaveKey].valor
  atualizarCarrinho()
  return false;
})
}

/////////////FINALIZANDO COMPRA///////////////////


let finalizandoCompra = document.querySelector('#finalizarCompra')
let visualizarComprasFinalizadas = document.querySelector('#visualizarComprasFinalizadas')
finalizandoCompra.addEventListener('click', compraFinalizada)

let pedido = 1
let quantidadeTotalFinalizaCompra = 0
let compras = []

function compraFinalizada() {
let carrinhoAtualizado = atualizarCarrinho();

if (carrinhoAtualizado === 0) {
  alert('Necessário informar produtos para finalizar a compra');
  return;
} 


visualizarComprasFinalizadas.innerHTML = ''; // Clear previous order details
console.log(itens)
compras.push({
  numero: pedido,
  itens: [],
  valor: []
});

let totalCarrinhoFinalizarCompra = 0

itens.map((val) => {
  if (val.quantidade > 0) {
    let totalItem = val.quantidade * val.valor;
    totalCarrinhoFinalizarCompra += totalItem;
    quantidadeTotalFinalizaCompra += val.quantidade;

    compras[compras.length - 1].itens.push({
      nome: val.nome,
      quantidade: val.quantidade,
    });

    compras[compras.length - 1].valor.push({
      total: totalCarrinhoFinalizarCompra
    });
}
});



console.log(compras)

// Increment pedido for the next order
pedido++;

compras.forEach((compra) => {
  visualizarComprasFinalizadas.innerHTML += `
    <div class="pedidoAnterior">
      <p id="numero_compra">Nº pedido: ${compra.numero}</p>
      ${compra.itens.map(item => `<p>${item.nome} ${item.quantidade}x</p>`).join('')}
      <p>Total: R$${compra.valor[compra.valor.length - 1].total},00</p>
      `;
});


// Clear the cart after finalizing the purchase
resetarCarrinho();

return alert('Compra Finaliza. Por favor, role para baixo até "Compras Finalizadas" ')
}

function resetarCarrinho() {
itens.forEach((val) => {
  val.quantidade = 0;
});
atualizarCarrinho();
}

///////////////////////////////////////RETIRADA////////////////////
