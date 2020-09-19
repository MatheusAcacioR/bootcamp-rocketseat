import React, { useState } from 'react';
import Header from './components/Header';

function App() {
    {/**Importar o useState no React */}
    {/*O useState retorna um array com duas posiçoes
    1. Variavel com o valor inicial
    2. Função que ira atualizar o valor da variavel

    Para isso podemos usar a desestruturação e utilizar essas duas posiçoes do array
    */}
    const [projects, setProjects] = useState(['Desenvolvimento de App', 'Front-end web', 'Python e React']);

    function handleAddProject() {
        //projects.push(`Novo Projeto ${Date.now()}`);

        setProjects([...projects, `Novo Projeto ${Date.now()}`])

        console.log(projects);
    }

    return (
        <>
          <Header title="Projects" />
             <ul>
                {projects.map(project => <li key={project}>{project}</li>)}
             </ul>

             <button type="button" onClick={handleAddProject}>Adicionar</button>
        </>
    );
}

export default App;