"use strict";

const $ = document.querySelector.bind(document);
const Cep = ((root) => {

	// Faz o Padrão Singleton
	if(!root["CepApi"]){ 
		root["CepApi"] = function(){}; 
		var Namespace = root["CepApi"]; 
	}else{
		var Namespace = root["CepApi"];
	}

	Namespace.prototype.init = function(cepCode = '', callback = ''){
		try {
    		if(typeof callback == "function" && Namespace.prototype.validacao(cepCode)){
    			Namespace.prototype.get(cepCode, callback);
    		}
		} catch(erro) {
    		throw erro.message;
		}
	}

	Namespace.prototype.get = function(cepCode, callback){
		var url = 'https://viacep.com.br/ws/' + cepCode + '/json';
    	//Inicio requisição AJAX
   	 	var xhr = new XMLHttpRequest();
    	xhr.open('GET', url, true);
    	xhr.responseType = 'text';
    	xhr.onload = function() {
        	//Requisição finalizada
        	if (xhr.readyState === 4 && xhr.status === 200) {
            	callback(JSON.parse(xhr.responseText));
            }
        } 
        xhr.send();
    }

    Namespace.prototype.validacao = function(cep){
    	return /\d{5}-?\d{3}/.test(cep);
    }

	return Namespace;

// Passa Variavel Global Window
})(window);