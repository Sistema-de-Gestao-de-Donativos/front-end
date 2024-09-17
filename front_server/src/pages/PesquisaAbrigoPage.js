import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/stylePesquisaAbrigo.css'; // Import the CSS file

function PesquisaAbrigoPage() {
    // State to store the search query, results, and search status
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const sampleData = [
        {
            id: 1,
            name: 'Abrigo Centro',
            country: 'Brasil',
            state: 'RS',
            city: 'Porto Alegre',
            neighborhood: 'Centro',
            street: 'Rua dos Andradas',
            number: 101,
            phone: '+55 51 98765-4321',
            email: 'centro@abrigo.com',
            code: 'CEN101'
        },
        {
            id: 2,
            name: 'Abrigo Cidade Baixa',
            country: 'Brasil',
            state: 'RS',
            city: 'Porto Alegre',
            neighborhood: 'Cidade Baixa',
            street: 'Rua Lima e Silva',
            number: 202,
            phone: '+55 51 91234-5678',
            email: 'cidadebaixa@abrigo.com',
            code: 'CBX202'
        },
        {
            id: 3,
            name: 'Abrigo Moinhos de Vento',
            country: 'Brasil',
            state: 'RS',
            city: 'Porto Alegre',
            neighborhood: 'Moinhos de Vento',
            street: 'Rua 24 de Outubro',
            number: 303,
            phone: '+55 51 92345-6789',
            email: 'moinhos@abrigo.com',
            code: 'MDV303'
        },
        {
            id: 4,
            name: 'Abrigo Menino Deus',
            country: 'Brasil',
            state: 'RS',
            city: 'Porto Alegre',
            neighborhood: 'Menino Deus',
            street: 'Av. Getúlio Vargas',
            number: 404,
            phone: '+55 51 93456-7890',
            email: 'meninodeus@abrigo.com',
            code: 'MND404'
        },
        {
            id: 5,
            name: 'Abrigo Jardim Botânico',
            country: 'Brasil',
            state: 'RS',
            city: 'Porto Alegre',
            neighborhood: 'Jardim Botânico',
            street: 'Rua Dr. Salvador França',
            number: 505,
            phone: '+55 51 94567-8901',
            email: 'jardimbotanico@abrigo.com',
            code: 'JBT505'
        }
    ];
    
    // Function to handle the search
    const handleSearch = () => {
        setHasSearched(true);

        // Check if the search query is empty
        if (searchQuery.trim() === '') {
            setResults([]); // Clear the results
            return; // Stop the function from proceeding
        }

        // Filter the sample data based on the search query
        const filteredResults = sampleData.filter((abrigo) =>
            abrigo.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filteredResults);
    };

    return (
        <main>
            <Header />
            <h1>SGDRS</h1>
            <h2>Pesquisa de Abrigos</h2>

            {/* Search input */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar por nome do Abrigo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>
{/* Results table */}
<div className="results-table">
    {/* Show "Nenhum resultado encontrado" if no results are found after a search */}
    {hasSearched && results.length === 0 ? (
        <p>Nenhum resultado encontrado</p>
    ) : (
        // Show results if there are any
        results.length > 0 && results.map((abrigo) => (
            <div key={abrigo.id} className="table-row">
                <h3>{abrigo.name}</h3>
                <p><strong>ID:</strong> {abrigo.id}</p>
                <p><strong>País:</strong> {abrigo.country}</p>
                <p><strong>Estado:</strong> {abrigo.state}</p>
                <p><strong>Cidade:</strong> {abrigo.city}</p>
                <p><strong>Bairro:</strong> {abrigo.neighborhood}</p>
                <p><strong>Rua:</strong> {abrigo.street}, {abrigo.number}</p>
                <p><strong>Telefone:</strong> {abrigo.phone}</p>
                <p><strong>Email:</strong> {abrigo.email}</p>
                <p><strong>Código:</strong> {abrigo.code}</p>
            </div>
                ))
            )}
        </div>
            {/* Back button
            <button className="back-button">Voltar</button> */}
        </main>
    );
}

export default PesquisaAbrigoPage;
