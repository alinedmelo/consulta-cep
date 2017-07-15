var campoCep = document.querySelector("#campo-cep");
var botao = document.querySelector("#buscar-cep");
var resultado = document.querySelector("#resultado");

botao.addEventListener ('click', function(event) {
    event.preventDefault();
    if (validaCep(campoCep.value)) {
        buscaCep();
    } else {
        atualizaResultado('CEP inválido');
    }
});

function validaCep(cep) {
    return /\d{5}-?\d{3}/.test(cep);
}

function buscaCep() {
    var cep = campoCep.value.replace('-', '');
    var url = 'https://viacep.com.br/ws/' + cep + '/json';

    //Inicio requisição AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    xhr.onload = function() {
        //Requisição finalizada e concluída
        if (xhr.readyState === 4 && xhr.status === 200) {
            preencheCampos(JSON.parse(xhr.responseText));
        } 
    }
    xhr.send();
}

function preencheCampos(json) {
    var msg = 'CEP não encontrado';
    if (!('erro' in json)) {
       msg = json.logradouro + ', ' + json.bairro + ' - ' + json.localidade + ' - ' + json.uf;
    }
    atualizaResultado(msg);
}

function atualizaResultado(textContent) {
    resultado.textContent = textContent;
    resultado.classList.remove('esconde-campo');
}