import React, { useState, useEffect } from 'react';
import './views/consultar_pedidos.css';

function HomePage2() {
    const [currentPage, setCurrentPage] = useState(1);
    const [orders, setOrders] = useState([]); // State to hold orders
    const [volunteers, setVolunteers] = useState([]); // State to hold volunteers
    const recordsPerPage = 6;

    // Fetch orders based on search query
    const searchOrder = async (event) => {
        event.preventDefault();

        const orderId = document.getElementById('order-id').value;
        const resultsContainer = document.getElementById('results');
        const paginationContainer = document.getElementById('pagination');
        resultsContainer.innerHTML = '';
        paginationContainer.innerHTML = '';

        if (orderId) {
            try {
                const response = await fetch(`/v1/pedidos?codPedido=${orderId}`);  // Fetch orders by order ID
                const data = await response.json();
                setOrders(data);  // Store the fetched orders in state
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        } else {
            setOrders([]);  // Clear orders if no order ID is provided
        }

        // Filter orders by order ID (if provided)
        const filteredOrders = orderId ? orders.filter((order) => order.codPedido === orderId) : orders;
        const totalPages = Math.ceil(filteredOrders.length / recordsPerPage);

        // Call displayPage to show the orders
        displayPage(filteredOrders, currentPage);

        // Create pagination buttons if needed
        if (totalPages > 1) {
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.classList.add('page-button');
                pageButton.innerHTML = i;
                pageButton.addEventListener('click', () => {
                    setCurrentPage(i);
                    displayPage(filteredOrders, i);
                });
                paginationContainer.appendChild(pageButton);
            }
        }
    };

    // Function to display paginated orders
    const displayPage = (filteredOrders, page) => {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';

        const start = (page - 1) * recordsPerPage;
        const end = page * recordsPerPage;
        const paginatedOrders = filteredOrders.slice(start, end);

        if (paginatedOrders.length > 0) {
            paginatedOrders.forEach((order) => {
                const orderElement = document.createElement('div');
                orderElement.classList.add('order-item');

                const orderId = document.createElement('input');
                orderId.type = 'text';
                orderId.value = `Pedido ${order.codPedido}`; // Using codPedido for the order ID
                orderId.readOnly = true;

                const orderStatus = document.createElement('input');
                orderStatus.type = 'text';
                orderStatus.value = `Status: ${order.status}`; // Displaying the status from the order object
                orderStatus.readOnly = true;

                const volunteerSelect = document.createElement('select');
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = '--Selecione--';
                defaultOption.selected = true;
                defaultOption.disabled = true;
                volunteerSelect.appendChild(defaultOption);

                volunteers.forEach((volunteer) => {
                    const option = document.createElement('option');
                    option.value = volunteer;
                    option.textContent = volunteer;
                    volunteerSelect.appendChild(option);
                });

                const saveButton = document.createElement('button');
                saveButton.classList.add('save-button');
                saveButton.textContent = 'Salvar';
                saveButton.addEventListener('click', () => {
                    alert(`Salvando alterações para o pedido ${order.codPedido}`);
                });

                orderElement.appendChild(orderId);
                orderElement.appendChild(orderStatus);
                orderElement.appendChild(volunteerSelect);
                orderElement.appendChild(saveButton);

                resultsContainer.appendChild(orderElement);
            });
        } else {
            resultsContainer.innerHTML = '<p className="no-results">Nenhum pedido encontrado com o ID fornecido.</p>';
        }
    };

    return (
        <main>
            <div className="container">
                <div className="menu-container">
                    <h2>Consulta de Pedidos</h2>
                    <form className="form-container" onSubmit={searchOrder}>
                        <div className="input-container">
                            <label htmlFor="order-id">ID Pedido</label>
                            <input
                                type="text"
                                id="order-id"
                                name="order-id"
                                maxLength="50"
                                placeholder="Digite o ID do pedido"
                            />
                        </div>
                        <button type="submit" className="menu-button">
                            Buscar
                        </button>
                    </form>

                    <div id="results" className="results-container"></div>
                    <div id="pagination" className="pagination-container"></div>
                </div>
            </div>
        </main>
    );
}

export default HomePage2;
