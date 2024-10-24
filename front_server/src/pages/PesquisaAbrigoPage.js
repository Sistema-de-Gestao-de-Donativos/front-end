import React, { useState } from 'react';
import Header from '../components/Header';
import '../pages/views/pesquisaAbrigo.css'; // Import the CSS file
import logo from '../components/logo.png'

function PesquisaAbrigoPage() {
    // State to store the search query, results, and search status
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    // Function to handle the search
    const handleSearch = async () => {
        setHasSearched(true);

        // debug
        // console.log(searchQuery);
    
        // Check if the search query is empty
        if (searchQuery.trim() === '') {
            setResults([]); // Clear the results
            setIsModalVisible(true); // Show modal if no search query
            return; // Stop the function from proceeding
        }
    
        console.log(searchQuery)
    
        try {
            // Make the API call
            
            const response = await fetch(`localhost:8080/v1/abrigos?nomeAbrigo=${searchQuery}`);
    
            // Check if the response is okay
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
    
            // Parse the JSON response
            const results = await response.json();
    
            // Set the results
            setResults(results);
    
            // Show modal if no results are found
            if (results.length === 0) {
                setIsModalVisible(true);
            } else {
                setIsModalVisible(false); // Hide modal if results are found
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            setResults([]); // Clear results in case of error
            setIsModalVisible(true); // Show modal for error
        }
    };
    
    // Function to close the modal
    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <main>
            <Header />
            <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
            </div>
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
                {hasSearched && results.length === 0 ? null : (
                    results.length > 0 && results.map((abrigo) => (
                        <div key={abrigo.id} className="table-row">
                            <h3>{abrigo.name}</h3>
                            <p><strong>ID:</strong> {abrigo.id}</p>
                            <p><strong>País:</strong> {abrigo.address.country}</p>
                            <p><strong>Estado:</strong> {abrigo.address.state}</p>
                            <p><strong>Cidade:</strong> {abrigo.address.city}</p>
                            <p><strong>Bairro:</strong> {abrigo.address.neighborhood}</p>
                            <p><strong>Rua:</strong> {abrigo.address.street}, {abrigo.address.number}</p>
                            <p><strong>Telefone:</strong> {abrigo.phone}</p>
                            <p><strong>Email:</strong> {abrigo.email}</p>
                            {/* <p><strong>Código:</strong> {abrigo.code}</p> */}
                        </div>
                    ))
                )}
            </div>


            {/* Modal */}
            {isModalVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Nenhum abrigo encontrado</h2>
                        <p>Por favor, tente outra busca.</p>
                        <button onClick={closeModal}>Fechar</button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default PesquisaAbrigoPage;
