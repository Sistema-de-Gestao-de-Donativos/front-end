import React, { useState, useEffect } from 'react';
import { useModalContext } from './ModalContext';
import { Link } from 'react-router-dom';
import logo from '../components/logo.png';

// Main component
const PesqCD = () => {
    const [codQuery, setCodQuery] = useState('');
    const [nameQuery, setNameQuery] = useState('');
    const [submissions, setSubmissions] = useState([]); // Store filtered CDs directly from the backend
    const { isModalVisible, modalMessage, showModal, hideModal } = useModalContext();

    // Handle search input change for code
    const handleCodChange = (event) => {
        setCodQuery(event.target.value);
    };

    // Handle search input change for name
    const handleNameChange = (event) => {
        setNameQuery(event.target.value);
    };

    // Fetch CD data from backend based on search query
    useEffect(() => {
        const fetchFilteredCDs = async () => {
            let queryParams = new URLSearchParams();

            // If either code or name query is filled, append to query parameters
            if (codQuery) queryParams.append('codCD', codQuery);
            if (nameQuery) queryParams.append('nameCD', nameQuery);

            try {
                // If query params are empty, fetch all CDs, otherwise fetch with filters
                const url = queryParams.toString() 
                    ? `http://localhost:8081/v1/cds?${queryParams.toString()}` 
                    : 'http://localhost:8081/v1/cds'; // Fetch all CDs if no filters are provided
                
                const response = await fetch(url);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched data:', data); // Debugging output
                    
                    if (Array.isArray(data)) {
                        setSubmissions(data); // Store the fetched data (can be filtered or full list)
                    } else {
                        setSubmissions([data]); // If a single item is returned, make it an array
                    }

                    if (data.length === 0) {
                        showModal("No results found");  // Show modal if no results found
                    } else {
                        hideModal();  // Hide modal if results are found
                    }
                } else {
                    showModal("Error fetching CDs");
                }
            } catch (error) {
                console.error('Error fetching CDs:', error);
                showModal("Error fetching data from the server.");
            }
        };

        // Trigger the fetch when either codQuery or nameQuery changes
        fetchFilteredCDs();

    }, [codQuery, nameQuery, showModal, hideModal]); // Run the effect when search parameters change

    // Handle search button click
    const handleSearchClick = () => {
        // Just triggering fetchFilteredCDs automatically by relying on useEffect
    };

    // Handle key press event for the search input
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            handleSearchClick();
        }
    };

    // Close modal
    const handleClose = () => {
        hideModal();
    };

    return (
        <div>
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>

            <div className="submissions-table">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Procurar por código"
                        value={codQuery}
                        onChange={handleCodChange}
                        onKeyDown={handleKeyDown} // Handle key press events
                    />
                    <input
                        type="text"
                        placeholder="Procurar por nome"
                        value={nameQuery}
                        onChange={handleNameChange}
                        onKeyDown={handleKeyDown} // Handle key press events
                    />
                    <button onClick={handleSearchClick}>Pesquisar</button>
                </div>

                {/* Render table only if there are results */}
                {submissions.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Pais</th>
                                <th>Estado</th>
                                <th>Cidade</th>
                                <th>Vizinhanca</th>
                                <th>Rua</th>
                                <th>Numero</th>
                                <th>Telefone</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((submission, index) => (
                                <tr key={index}>
                                    {/* Corrected to match backend format */}
                                    <td>{submission.code !== undefined ? submission.code : 'N/A'}</td>
                                    <td>{submission.name || 'N/A'}</td>
                                    <td>{submission.address?.country || 'N/A'}</td>
                                    <td>{submission.address?.state || 'N/A'}</td>
                                    <td>{submission.address?.city || 'N/A'}</td>
                                    <td>{submission.address?.neighborhood || 'N/A'}</td>
                                    <td>{submission.address?.street || 'N/A'}</td>
                                    <td>{submission.address?.number || 'N/A'}</td>
                                    <td>{submission.phone || 'N/A'}</td>
                                    <td>{submission.email || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>0 resultados encontrados</p>
                )}

                {/* Modals */}
                {isModalVisible && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>{modalMessage === "Sem resultados" ? "Sem resultados" : "Erro"}</h2>
                            <p>{modalMessage}</p>
                            <button onClick={handleClose}>OK</button>
                        </div>
                    </div>
                )}

                <div className='btnhome'>
                    <Link to={"/"}><button id='btn-home'>Voltar</button></Link>
                </div>
            </div>
        </div>
    );
};

export default PesqCD;
