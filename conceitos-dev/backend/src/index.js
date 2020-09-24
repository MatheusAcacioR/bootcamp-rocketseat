// Reqisitando as funções do pacote do express
const express = require('express');

//Instanciando o CORS
const cors = require('cors');

const { uuid, isUuid } = require('uuidv4');

// Invocando todos os métodos do objeto do express em uma variável
const app = express();

//Invocando o CORS
app.use(cors());

// O express por padrão nao lê informações do tipo JSON, para isso é necesário passar esse método para o express
app.use(express.json());

const projects = [];

// Funções Middlewares que vão interceptar uma requisição para poder monitorar ou interrompe-la dependendo da ocasião.
function logRequests(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`

    console.time(logLabel);

    next(); // Próximo middleware

    console.timeEnd(logLabel)
}

function validateProjectId(request, response, next) {
    const { id } = request.params;

    if(!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid project ID.' });
    }

    return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId)

// Gerando a primeira requisição HTTP, enviando uma resposta para o cliente saber que a conexão esta online
app.get('/projects', (request, response) => {
    {/**Ultilizando query params para filtrar determinado parametro da informação, fazendo uma desestruturação em variavél */}
    const { title } = request.query;

    const results = title
      ? projects.filter(project => project.title.includes(title))
      : projects;

    return response.json(results);
});

/**Testando outra requisição HTTP, porem agora o metodo 'post', que serve para criar uma informação no backend,
utilizando a mesma rota porem com o metodo diferente. */

app.post('/projects', (request, response) => {
    {/**Ultilizando request body no metodo post/ inserindo parametros dentro de uma variavel para armazenar informações
    dentro desses parametros, ultilizando o metodo push do javascript */}
    const { title, owner } = request.body;

    const project = { id: uuid(), title, owner };

    projects.push(project);

    return response.json(project);
});

/**Nos metodos put e delete, a rota é um pouco diferente pois quando se fala em alterar ou remover uma informação do backend,
temos que especificar qual informação queremos alterar ou remover e não todas as informações, para isso especificamosna rota
o id unico da informação que queremos altertar*/
app.put('/projects/:id', (request, response) => {
    {/**Ultilizando route params no metodo put, que tambem é usado no metodo delete/ percorrendo as informações ja listadas
    no array da variavel e identificando qual informação atraves da sua posição no array de informações para poder atualizar
    os parametros contidos dentro de uma informação. */}
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    {/**Micro-validação para saber se essa informação existe */}
    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' })
    }

    {/**Criando uma nova variavel e os novos parametros para a atualização da informação */}
    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    {/**Ultilizando route params no metodo put, que tambem é usado no metodo delete/ percorrendo as informações ja listadas
    no array da variavel e identificando qual informação atraves da sua posição no array de informações para poder deletar 
    uma informação. */}
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    {/**Micro-validação para saber se essa informação existe */}
    if (projectIndex < 0) {
        return response.status(400).json({ error: 'Project not found.' })
    }

    projects.splice(projectIndex, 1)

    return response.status(204).send();
});

// Porta onde esta sendo ouvida o servidor e uma mensagem no backend para saber que o server esta online
app.listen(3333, () => {
    console.log('📡Backend online!');
});