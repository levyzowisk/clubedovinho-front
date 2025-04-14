// import { format } from 'date-fns';
// Via cnd p
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// console.log(timezone); 

import { format } from 'https://cdn.skypack.dev/date-fns';
const TABLE = document.getElementById('table-customers');

const language = navigator.language;

console.log(language);

function convertDate(region, date) {
    switch(region) {
        case 'pt-BR': // BR;
        case 'es': // Espanha
        return format(date, 'dd-MM-yyyy'); 
        case 'en-US': // EUA
            return format(date, 'MM-dd-yyyy');
        case 'ja': // Japones;
        case 'zh-TW': // Chines;
            return format(date, 'yyyy-MM-dd');

        default:
            return format(date, 'dd-MM-yyyy') 
        }
}

fetch('https://feitoza.tec.br/api/index.php')
    .then(res => res.json())
    .then(json => carregarTabela(json));

function carregarTabela(clientes) {
    clientes.forEach(cada => {
        TABLE.innerHTML += `
            <tr>
                <td>${cada.id}</td>
                <td>${cada.nome}</td>
                <td>${cada.email}</td>
                <td>${cada.telefone}</td>
                <td><img class="rounded" src="${cada.foto}" width="50px"></td>

                <td>${convertDate(language, cada.data_cadastro)}</td>
                <td>${convertDate(language, cada.data_ultimo_pedido)}</td>

                <td>
                    <button>Editar</button>

                    <button>Excluir</button>
                </td>
            </tr>
        `;
    });
}