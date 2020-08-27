// Reqisitando as funções do pacote do express
const express = require('express');

// Invocando todos os métodos do objeto do express em uma variável
const app = express();

// Gerando a primeira requisição HTTP, enviando uma resposta para o cliente saber que a conexão esta online
app.get('/', (request, response) => {
    return response.json([{ message: 'Hello World' }]);
});

// Porta onde esta sendo ouvida o servidor e uma mensagem no backend para saber que o server esta online
app.listen(3333, () => {
    console.log('📡Backend online!');
});