import React, { useState } from 'react';
import './views/meusPedidos.css';

function MeusPedidos() {
  const [orders, setOrders] = useState([]); // Holds fetched orders
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [queryId, setQueryId] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateStatusVisible, setUpdateStatusVisible] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  // Fetch orders based on optional search parameters
  const fetchOrders = async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();

      // Dynamically add parameters if they exist
      if (params.codPedido) queryParams.append('codPedido', params.codPedido);

      // Build the full URL with query parameters
      const url = `/v1/pedidos${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        // Map response fields to align with UI expectations
        const mappedOrders = data.map(order => ({
          id: order.codPedido, // Map codPedido to id
          centroDistribuicao: order.codCentroDestribuicao, // Map codCentroDestribuicao to centroDistribuicao
          status: order.status,
          items: order.items,
        }));

        setOrders(mappedOrders);
        setFilteredOrders(mappedOrders);
        setSearchClicked(true);
      } else {
        alert('Erro ao buscar os pedidos.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Erro de rede ou servidor indisponível.');
    }
  };

  // Function to handle order search based on the ID
  const searchOrders = (event) => {
    event.preventDefault();
    fetchOrders({ codPedido: queryId });
  };

  // Function to confirm receipt of a selected order
  const confirmReceipt = async (orderId) => {
    try {
      const response = await fetch(`/v1/pedidos/confirmar?codPedido=${orderId}&status=Recebido`, { method: 'GET' });

      if (response.status === 201) {
        alert('Pedido confirmado com sucesso!');
      } else if (response.status === 400) {
        alert('Erro ao confirmar o pedido.');
      } else {
        alert('Erro inesperado.');
      }
    } catch (error) {
      console.error('Error during confirmation:', error);
      alert('Erro de rede ou servidor indisponível.');
    }
  };

  // Handle receipt confirmation when the user clicks on the button
  const handleConfirmReceipt = (orderId) => {
    confirmReceipt(orderId);
  };

  // Show order details in a modal
  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  // Show the Update Status Form
  const openUpdateStatusForm = (order) => {
    setSelectedOrder(order);
    setUpdateStatusVisible(true);
  };

  const closeUpdateStatusForm = () => {
    setUpdateStatusVisible(false);
    setNewStatus('');
    setSelectedOrder(null);
  };

  // Update order status via PUT endpoint
  const updateOrderStatus = async () => {
    if (!newStatus) {
      alert('Por favor, selecione um status.');
      return;
    }

    try {
      const response = await fetch('/v1/pedidos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codPedido: selectedOrder.id,
          status: newStatus,
        }),
      });

      if (response.ok) {
        alert('Status atualizado com sucesso!');
        closeUpdateStatusForm();
        fetchOrders(); // Refresh the list
      } else if (response.status === 404) {
        alert('Pedido não encontrado.');
      } else {
        alert('Erro ao atualizar o status.');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Erro de rede ou servidor indisponível.');
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h2>Meus Pedidos</h2>

        <form className="search-form" onSubmit={searchOrders}>
          <input
            type="text"
            id="search-query"
            name="search-query"
            maxLength="50"
            placeholder="Buscar por ID do Pedido"
            value={queryId}
            onChange={(e) => setQueryId(e.target.value)}
          />
          <button type="submit" className="search-button">Buscar</button>
        </form>

        {searchClicked && (
          <div id="order-list" className="user-list">
            {filteredOrders.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID do Pedido</th>
                    <th>Centro de Distribuição</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id} onClick={() => showOrderDetails(order)}>
                      <td>{order.id}</td>
                      <td>{order.centroDistribuicao}</td>
                      <td>{order.status}</td>
                      <td>
                        {order.status === 'Em trânsito' && (
                          <button
                            className="search-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConfirmReceipt(order.id);
                            }}
                          >
                            Confirmar Recebimento
                          </button>
                        )}
                        <button
                          className="search-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openUpdateStatusForm(order);
                          }}
                        >
                          Atualizar Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-results">Nenhum pedido encontrado.</p>
            )}
          </div>
        )}
      </div>

      {modalVisible && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>×</button>
            <h3 className="modal-title">Pedido {selectedOrder.id}</h3>
            <ul className="item-list">
              {selectedOrder.items.map((item, index) => (
                <li key={index} className="item">
                  <span className="item-name">{item.name}</span> -
                  <span className="item-quantity"> Quantidade: {item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {updateStatusVisible && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeUpdateStatusForm}>×</button>
            <h3 className="modal-title">Atualizar Status do Pedido {selectedOrder.id}</h3>
            <form>
              <label>
                Novo Status:
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                  <option value="" disabled>Selecione um status</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Em trânsito">Em trânsito</option>
                  <option value="Recebido">Recebido</option>
                </select>
              </label>
              <button type="button" className="search-button" onClick={updateOrderStatus}>
                Atualizar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MeusPedidos;
