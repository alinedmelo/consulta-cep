// Constants
const API_BASE_URL = 'https://viacep.com.br/ws';
const MESSAGES = {
    INVALID_CEP: 'CEP inválido',
    CEP_NOT_FOUND: 'CEP não encontrado na base de dados'
};

// DOM Elements
const elements = {
    campoCep: document.querySelector("#campo-cep"),
    form: document.querySelector("#form"),
    resultado: document.querySelector("#resultado")
};

/**
 * Valida se o CEP possui o formato correto (apenas números, 8 dígitos)
 * @param {string} cep - CEP a ser validado
 * @returns {boolean} - true se o CEP é válido, false caso contrário
 */
const validaCep = (cep) => /^\d{5}-?\d{3}$/.test(cep);

/**
 * Limpa o CEP removendo caracteres especiais
 * @param {string} cep - CEP a ser limpo
 * @returns {string} - CEP contendo apenas números
 */
const limpaCep = (cep) => cep.replace(/\D/g, '');

/**
 * Exibe o resultado na interface
 * @param {string} mensagem - Mensagem a ser exibida
 */
const exibeResultado = (mensagem) => {
    elements.resultado.textContent = mensagem;
    elements.resultado.classList.remove('esconde-campo');
};

/**
 * Formata o endereço completo a partir dos dados da API
 * @param {Object} dados - Dados do endereço retornados pela API
 * @returns {string} - Endereço formatado
 */
const formataEndereco = (dados) => {
    return `${dados.logradouro}, ${dados.bairro} - ${dados.localidade} - ${dados.uf}`;
};

/**
 * Busca o CEP na API do ViaCEP
 * @param {string} cep - CEP a ser buscado (apenas números)
 * @returns {Promise<Object>} - Promise com os dados do endereço
 */
const consultaCepAPI = async (cep) => {
    const url = `${API_BASE_URL}/${cep}/json`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        throw error;
    }
};

/**
 * Processa os dados retornados pela API
 * @param {Object} dados - Dados retornados pela API
 */
const processaDadosCep = (dados) => {
    if (dados.erro) {
        exibeResultado(MESSAGES.CEP_NOT_FOUND);
    } else {
        const enderecoFormatado = formataEndereco(dados);
        exibeResultado(enderecoFormatado);
    }
};

/**
 * Handler principal para buscar o CEP
 */
const buscaCep = async () => {
    const cepLimpo = limpaCep(elements.campoCep.value);
    
    try {
        const dados = await consultaCepAPI(cepLimpo);
        processaDadosCep(dados);
    } catch (error) {
        exibeResultado(MESSAGES.CEP_NOT_FOUND);
    }
};

/**
 * Handler do evento de submit do formulário
 * @param {Event} event - Evento de submit
 */
const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const cepValue = elements.campoCep.value;
    
    if (validaCep(cepValue)) {
        await buscaCep();
    } else {
        exibeResultado(MESSAGES.INVALID_CEP);
    }
};

// Inicialização
elements.form.addEventListener('submit', handleFormSubmit);