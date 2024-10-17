import React, { useState } from 'react';
import './views/consultar_pedidos.css';

const orders = [
    { id: 101, status: 'Enviado' },
    { id: 102, status: 'Em separação' },
    { id: 103, status: 'Pronto para entrega' },
    { id: 104, status: 'Enviado' },
    { id: 105, status: 'Em separação' },
    { id: 106, status: 'Pronto para entrega' },
    { id: 107, status: 'Em separação' },
    { id: 108, status: 'Enviado' },
    { id: 109, status: 'Pronto para entrega' },
    { id: 110, status: 'Em separação' },
    { id: 111, status: 'Pronto para entrega' },
    { id: 112, status: 'Enviado' },
    { id: 113, status: 'Pronto para entrega' },
    { id: 114, status: 'Enviado' },
    { id: 115, status: 'Em separação' },
    { id: 116, status: 'Pronto para entrega' }
];

function HomePage() {
    const [currentPage, setCurrentPage] = useState(1);

    const volunteers = ['Ana', 'Bruno', 'Carlos', 'Davi', 'Eduarda'];
    const recordsPerPage = 6;

    const searchOrder = (event) => {
        event.preventDefault();

        const orderId = document.getElementById('order-id').value;
        const resultsContainer = document.getElementById('results');
        const paginationContainer = document.getElementById('pagination');
        resultsContainer.innerHTML = '';
        paginationContainer.innerHTML = '';

        const filteredOrders = orderId ? orders.filter(order => order.id == orderId) : orders;
        const totalPages = Math.ceil(filteredOrders.length / recordsPerPage);
        
        displayPage(filteredOrders, currentPage);

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

    const displayPage = (filteredOrders, page) => {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';

        const start = (page - 1) * recordsPerPage;
        const end = page * recordsPerPage;
        const paginatedOrders = filteredOrders.slice(start, end);

        if (paginatedOrders.length > 0) {
            paginatedOrders.forEach(order => {
                const orderElement = document.createElement('div');
                orderElement.classList.add('order-item');
                
                const orderId = document.createElement('input');
                orderId.type = 'text';
                orderId.value = `Pedido ${order.id}`;
                orderId.readOnly = true;

                const orderStatus = document.createElement('input');
                orderStatus.type = 'text';
                orderStatus.value = `Status: ${order.status}`;
                orderStatus.readOnly = true;

                const volunteerSelect = document.createElement('select');
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = '--Selecione--';
                defaultOption.selected = true;
                defaultOption.disabled = true;
                volunteerSelect.appendChild(defaultOption);
                
                volunteers.forEach(volunteer => {
                    const option = document.createElement('option');
                    option.value = volunteer;
                    option.textContent = volunteer;
                    volunteerSelect.appendChild(option);
                });

                const saveButton = document.createElement('button');
                saveButton.classList.add('save-button');
                saveButton.textContent = 'Salvar';
                saveButton.addEventListener('click', () => {
                    alert(`Salvando alterações para o pedido ${order.id}`);
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
                            <input type="text" id="order-id" name="order-id" maxlength="50" placeholder="Digite o ID do pedido" />
                        </div>
                        <button type="submit" className="menu-button">Buscar</button>
                    </form>
                    <div id="results" className="results-container"></div>
                    <div id="pagination" className="pagination-container"></div>
                </div>
            </div>
        </main>
    );
}


export default HomePage;
