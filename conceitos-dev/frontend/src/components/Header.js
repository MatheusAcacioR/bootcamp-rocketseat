import React from 'react';

// Usando desestruturação para inserir as propiedades title e as children (conteudo de dentro do componente)
export default function Header({ title }) {
    return (
        <header>
            <h1>{title}</h1>
        </header>
    )
}