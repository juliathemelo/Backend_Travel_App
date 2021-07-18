var objJson = [];

const URL = `http://localhost:8080/travels`;
fetch(URL)
    .then((resposta) => resposta.json())
    .then((data) => preencherDados(data))
    .catch((erro) => console.error(erro));

var listing_table = document.getElementById("tabela-lista-corpo");

listing_table.innerHTML = "";

function preencherDados(lista) {
    lista.forEach((element) => {
        let linha = document.createElement("tr");
        let itemDaLinhaNome = document.createElement("td");
        itemDaLinhaNome.innerText = element.destination.local;
        let itemDaLinhaOpcao = document.createElement("td");
        itemDaLinhaOpcao.innerHTML = element.derpature.local;
        let itemDaLinhaSinopse = document.createElement("td");
        itemDaLinhaSinopse.innerHTML = element.derpature.time;
        let itemDaLinhaVisto = document.createElement("td");
        itemDaLinhaVisto.innerHTML = element.destination.time;
        let itemDaLinhaNumeroPassageiros = document.createElement("td");
        itemDaLinhaNumeroPassageiros.innerHTML = element.passengersInfos.length;
        linha.appendChild(itemDaLinhaNome);
        linha.appendChild(itemDaLinhaOpcao);
        linha.appendChild(itemDaLinhaSinopse);
        linha.appendChild(itemDaLinhaVisto);
        linha.appendChild(itemDaLinhaNumeroPassageiros);
        listing_table.appendChild(linha);
    });
}