import React, { useState } from 'react';
import Header from '../components/Header';
import '../pages/views/pesquisaAbrigo.css'; // Import the CSS file
import logo from '../components/logo.png';

function PesquisaAbrigoPage() {
    // State to store the search query, result object, and search status
    const [searchQuery, setSearchQuery] = useState('');
    const [result, setResult] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    // Function to handle the search
    const handleSearch = async () => {
        setHasSearched(true);
        if (searchQuery.trim() === '') {
            setResult(null); // Clear the result
            setIsModalVisible(true);
            return;
        }
    
        try {
            const response = await fetch(`/v1/abrigos?nomeAbrigo=${searchQuery}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
    
            const data = await response.json();
            console.log("API response:", data);

            // Check if data is an object and not empty
            if (data && Object.keys(data).length > 0) {
                setResult(data);
                setIsModalVisible(false);
            } else {
                setResult(null);
                setIsModalVisible(true);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setResult(null); // Clear result on error
            setIsModalVisible(true);
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

            {/* Results section */}
            <div className="results-table">
                {hasSearched && result ? (
                    <div className="table-row">
                        <h3>{result.name}</h3>
                        <p><strong>País:</strong> {result.address?.country}</p>
                        <p><strong>Estado:</strong> {result.address?.state}</p>
                        <p><strong>Cidade:</strong> {result.address?.city}</p>
                        <p><strong>Bairro:</strong> {result.address?.neighborhood}</p>
                        <p><strong>Rua:</strong> {result.address?.street}, {result.address?.number}</p>
                        <p><strong>Telefone:</strong> {result.phone}</p>
                        <p><strong>Email:</strong> {result.email}</p>
                    </div>
                ) : hasSearched && !result && (
                    <p></p>
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
