var campoCep = document.querySelector("#campo-cep");
var botao = document.querySelector("#buscar-cep");
var resultado = document.querySelector("#resultado");

botao.addEventListener ('click', function(event) {

    event.preventDefault();
    var form = document.querySelector('#form');

        var valida = validaCep(campoCep.value);
        if (valida == true) {
            buscaCep();
        } else {
            atualizaResultado();
            resultado.textContent = 'CEP inválido';
        }
});
function validaCep(cepValido) {

    function validaCep(cepValido) {
        
        return /\d{5}-?\d{3}/.test(cepValido);
    }
}
function buscaCep() {
    
    var cep = campoCep.value.replace('-', '');
    var url = 'https://viacep.com.br/ws/' + cep + '/json';

    //Inicio requisição AJAX
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.responseType = 'text';

    xhr.onload = function() {
        //Requisição finalizada
        if (xhr.readyState === 4) {
            //requisição bem sucedida
            if (xhr.status === 200) {                									
                preencheCampos(JSON.parse(xhr.responseText)); 
            } 
        } 
    }
    xhr.send();
}
function preencheCampos(json) {

    if (!('erro' in json)) {
        atualizaResultado();
        resultado.textContent = json.logradouro + ', ' +
                            json.bairro + ' - ' +
                            json.localidade + ' - ' +
                            json.uf; 
    } else {
        atualizaResultado();
        resultado.textContent = 'CEP não encontrado';
    }
}
function atualizaResultado() {
    
    resultado.textContent ='';
    resultado.classList.remove('esconde-campo');
}