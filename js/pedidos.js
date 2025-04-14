import { formatDistance } from 'https://cdn.jsdelivr.net/npm/date-fns@3.6.0/+esm';
import ptBR from 'https://cdn.jsdelivr.net/npm/date-fns@3.6.0/locale/pt-BR/+esm';

const TABLE_ORDER = document.getElementById('table-order');
const SELECT_PRODUTO = document.getElementById('produto');
const INPUT_QUANTITY = document.getElementById('quantity');
const VALOR_COMPRA =  document.getElementById('valor_compra');
const INPUT_ENTREGA = document.getElementById('entrega')
let content = ''
let contentProduto = ''

fetch('http://localhost:3000/orders')
.then(res => res.json())
.then(data => {
  
  data.forEach(element => {
    content += `
    <tr> 
        <td>${element.id}</td> 
        <td>${element.codigo}</td> 
        <td>${element.nome}</td> 
        <td>${element.quantidade}</td> 
        <td>${element.valor}</td> 
        <td>${formatDistance(new Date(element.data), new Date(), {locale: ptBR})} atrás</td> 
        <td>${element.local}</td> 

    </tr>
`
  }) 

TABLE_ORDER.innerHTML += content;
  
})

fetch("http://localhost:3000/products")
.then(res => res.json())
.then(data => {
  
  data.forEach((element) => {
    contentProduto += 
    `
    <option value="${element.preco}">${element.nome}</option>
    `
  })
  SELECT_PRODUTO.innerHTML += contentProduto;  
})

window.calcularCompra = () => {
  VALOR_COMPRA.innerText += INPUT_QUANTITY.value * SELECT_PRODUTO.value;
  
}

window.addOrder = (event) => {
  event.preventDefault()
  const data = new Date()

   let dados = {
    codigo: Math.floor(Math.random() * 10 * Math.random() * 20),
    nome: SELECT_PRODUTO.value,
    quantidade: INPUT_QUANTITY.value,
    valor: VALOR_COMPRA.innerHTML.replace('R$ ', ''),
    data: data,
    local: INPUT_ENTREGA.value
   }
  fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(dados)

  })
  alert("Pedido enviado com sucesso!")
  
}
