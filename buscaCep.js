// Globals
const campoCep = document.querySelector("#campo-cep");
const form = document.querySelector("#form");
let resultado = document.querySelector("#resultado");

form.addEventListener('submit', event => {
    event.preventDefault();
    
    if (validaCep(campoCep.value) === true) {
        buscaCep();
    } else {
        atualizaResultado();
        resultado.textContent = 'CEP inválido';
    }
});

// valida campo para que sejam digitados somente números
const validaCep = cepValido => /\d{5}-?\d{3}/.test(cepValido);


const buscaCep = () => {
    
    const cep = campoCep.value.replace('-', '');
    const url = 'https://viacep.com.br/ws/' + cep + '/json';

    //Inicio requisição AJAX
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';

    xhr.onload = () => {        
        //requisição bem sucedida
        if (xhr.status === 200) {                									
                preencheCampos(JSON.parse(xhr.responseText)); 
        } 
    }
    xhr.send();
}

const preencheCampos = json => {

    if (!('erro' in json)) {      
        atualizaResultado();
        resultado.textContent = `${json.logradouro}, ${json.bairro} - ${json.localidade} - ${json.uf}`
    } else {
        atualizaResultado();
        resultado.textContent = 'CEP não encontrado na base de dados';
    }
}

const atualizaResultado = () => {
    resultado.textContent ='';
    resultado.classList.remove('esconde-campo');
}