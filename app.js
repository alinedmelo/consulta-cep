var ApiCep = new Cep(),
    cepDigitado = $(".cep"),
    formulario = $(".form"),
    resultado = $("#resultado");

formulario.addEventListener('submit', function(event) {

    event.preventDefault();
    var form = document.querySelector('#form');
    if (ApiCep.validacao(cepDigitado.value) == true) {
        ApiCep.init(cepDigitado.value, function(json){
            if (!('erro' in json)) {
                atualizaResultado();
                resultado.textContent = json.logradouro + ', ' + json.bairro + ' - ' + json.localidade + ' - ' +json.uf; 
            } else {
                atualizaResultado();
                resultado.textContent = 'CEP não encontrado';
            }
        });
    } else {
        atualizaResultado();
        resultado.textContent = 'CEP inválido';
    }

});

function atualizaResultado() {
    
    resultado.textContent = '';
    resultado.classList.remove('esconde-campo');

}