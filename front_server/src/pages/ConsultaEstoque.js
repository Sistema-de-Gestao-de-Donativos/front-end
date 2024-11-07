import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../pages/views/consultaEstoque.css'; // Import the CSS file
import logo from '../components/logo.png';

function ConsultaEstoque() {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Sample data to simulate API response
    const sampleData = [
        { item: 'Item A', quantidade: 10 },
        { item: 'Item B', quantidade: 5 },
        { item: 'Item C', quantidade: 20 },
    ];

    // Function to handle the search
    const handleSearch = async () => {
        setHasSearched(true);

        // search using substring, return every item that contains that substring
        
        // Simulating an API call with sample data
        const data = searchQuery.trim() === '' 
            ? sampleData 
            : sampleData.filter((item) =>
                item.item.toLowerCase().includes(searchQuery.toLowerCase())
            );
        
        // Simulating results and modal behavior
        if (data && data.length > 0) {
            setResults(data);
            setIsModalVisible(false);
        } else {
            setResults([]);
            setIsModalVisible(true);
        }
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalVisible(false);
    };

    // Fetch all items initially on component mount (using sample data here)
    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <main>
            <Header />
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>Consulta de Estoque</h2>

            {/* Search input */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar por nome do item..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>

            {/* Results table */}
            <div className="results-table">
                {hasSearched && results.length === 0 ? (
                    <p></p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.item || 'N/A'}</td>
                                    <td>{item.quantidade || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            {isModalVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Nenhum item encontrado no estoque</h2>
                        <button onClick={closeModal}>Fechar</button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default ConsultaEstoque;
