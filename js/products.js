import { formatDistance  } from 'https://cdn.jsdelivr.net/npm/date-fns@3.6.0/+esm';
const TABLE = document.getElementById('table-products');

window.abrirModal = (nome, imagem, data) => {
    document.getElementById('modal_produto_nome').innerHTML = nome;
    document.getElementById('modal_produto_body').innerHTML = `
        <img src="${imagem}" width="100%">
    `;
    const dataProduto = new Date(data, 1, 1)
    const dataAtual = new Date()
    document.getElementById('tempo').innerText = `Vinho produzido há ${formatDistance(dataProduto, dataAtual).replace('about', '').replace('years', '').replace('over', '')} anos atrás`;
};

window.excluir = (id) => {
    if (!confirm('Confirma a exclusão?')) return;
    fetch(`http://localhost:3000/products/${id}`, { method: 'DELETE' })
        .then(() => location.reload());
};

fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(dados => {
        dados.forEach((product) => {
            TABLE.innerHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.nome}</td>
                    <td>${product.categoria}</td>
                    <td>${product.safra}</td>
                    <td><img onclick="abrirModal('${product.nome}', '${product.imagem}', '${product.safra}')" 
                             data-bs-toggle="modal" 
                             data-bs-target="#exampleModal" 
                             src="${product.imagem}" 
                             height="60px"></td>
                    <td>${product.quantidade}</td>
                    <td>${product.preco}</td>
                    <td>
                        <a href="#" class="btn btn-outline-warning btn-sm">Editar</a>
                        <a href="#" onclick="excluir(${product.id})" class="btn btn-outline-danger btn-sm">Excluir</a>
                    </td>
                </tr>
            `;
        });
    });