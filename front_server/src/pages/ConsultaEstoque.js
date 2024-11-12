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
    // const sampleData = [
    //     { nome: 'Item A', quantidade: 10, unidade: 'kg', categoria: 'Alimentos' },
    //     { nome: 'Item B', quantidade: 5, unidade: 'un', categoria: 'Bebidas' },
    //     { nome: 'Item C', quantidade: 20, unidade: 'L', categoria: 'Produtos de Limpeza' },
    // ];

    // Function to handle the search
    const handleSearch = async () => {
        setHasSearched(true);

        // // Using sample data instead of actual API response
        // const filteredData = searchQuery.trim() === ''
        //     ? sampleData
        //     : sampleData.filter((item) =>
        //         item.nome.toLowerCase().includes(searchQuery.toLowerCase())
        //     );

        // if (filteredData.length > 0) {
        //     setResults(filteredData);
        //     setIsModalVisible(false);
        // } else {
        //     setResults([]);
        //     setIsModalVisible(true);
        // }

        
        try {
            // retrieve correct codCD, 1 as placeholder for now
            const codCd = 1;
            const response = await fetch(`/v1/stock/${codCd}`);
            if (response.ok) {
                const data = await response.json();
                
                // Filter items by search query if needed
                const filteredData = searchQuery.trim() === ''
                    ? data
                    : data.filter((item) =>
                        item.nome.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                
                if (filteredData.length > 0) {
                    setResults(filteredData);
                    setIsModalVisible(false);
                } else {
                    setResults([]);
                    setIsModalVisible(true);
                }
            } else {
                console.error('Failed to fetch data:', response.statusText);
                setResults([]);
                setIsModalVisible(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setResults([]);
            setIsModalVisible(true);
        }

    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalVisible(false);
    };

    // Fetch all items initially on component mount
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
                                <th>Unidade</th>
                                <th>Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nome || 'N/A'}</td>
                                    <td>{item.quantidade || 'N/A'}</td>
                                    <td>{item.unidade || 'N/A'}</td>
                                    <td>{item.categoria || 'N/A'}</td>
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
