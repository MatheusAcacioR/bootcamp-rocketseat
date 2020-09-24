import React, { useState, useEffect } from 'react';
import api from './services/api';
import Header from './components/Header';
import './App.css';

function App() {
    {/**Importar o useState no React */ }
    {/*O useState retorna um array com duas posiçoes
    1. Variavel com o valor inicial
    2. Função que ira atualizar o valor da variavel

    Para isso podemos usar a desestruturação e utilizar essas duas posiçoes do array
    */}
    const [projects, setProjects] = useState([]);

    //useEffect é utilizado para disparar uma função quamndo uma informação é alterada ou disparar uma função quando alguma 
    //informação é mostrada em tela

    //Função que requer dois parametros, a função que vai ser disparada, e quando essa função vai ser disparada
    useEffect(() => {
        //chamada a api e o metodo dela, passando no parametro o caminho depois da 'barra'. Pode utilizar o .then como 
        //opcao da requisicao demorar um certo tempo
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        //projects.push(`Novo Projeto ${Date.now()}`);

        //setProjects([...projects, `Novo Projeto ${Date.now()}`])

        //Adicionando novo projeto pelo frontend
        //Chamada a api e o metodo referente a funcao dela
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: "Matheus Acácio"
        })

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="Projects" />

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar</button>
        </>
    );
}

export default App;