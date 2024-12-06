import React, { useState } from 'react';
import './views/novo_pedido.css';

function NovoPedido() {
  const [codCentroDestribuicao, setCodCentroDestribuicao] = useState('');
  const [codAbrigo, setCodAbrigo] = useState('');
  const [items, setItems] = useState([{ codItem: '', name: '', quantity: 1 }]);
  const [popUpMessage, setPopUpMessage] = useState('');
  const [popUpColor, setPopUpColor] = useState('');
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const enviarPedido = async () => {
    // Validate form fields
    if (!codCentroDestribuicao || !codAbrigo || items.some(item => !item.codItem || !item.name || !item.quantity)) {
      setPopUpMessage('Todos os campos são obrigatórios!');
      setPopUpColor('red');
      setIsPopUpVisible(true);
      return;
    }

    // Construct the payload
    const payload = {
      codCentroDestribuicao,
      codAbrigo,
      items: items.map(item => ({
        codItem: item.codItem,
        nome: item.name,
        quantidade: parseInt(item.quantity, 10), // Ensure quantity is a number
      })),
    };

    try {
      // Make POST request to the proxy endpoint
      const response = await fetch('/v1/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        setPopUpMessage('Pedido enviado com sucesso!');
        setPopUpColor('green');
        console.log('Pedido enviado:', result);

        // Clear form data
        setCodCentroDestribuicao('');
        setCodAbrigo('');
        setItems([{ codItem: '', name: '', quantity: 1 }]);
      } else {
        const errorData = await response.json();
        setPopUpMessage(`Erro: ${errorData.error || 'Algo deu errado!'}`);
        setPopUpColor('red');
      }
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      setPopUpMessage('Erro de rede ou servidor indisponível.');
      setPopUpColor('red');
    }

    setIsPopUpVisible(true); // Show the pop-up message
  };

  const addItem = () => {
    setItems([...items, { codItem: '', name: '', quantity: 1 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const closePopUp = () => {
    setIsPopUpVisible(false); // Fecha o pop-up
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h2>Novo Pedido</h2>

        <form className="order-form-new">
          <label>
            {/* Centro de Distribuição: */}
            <input
              type="text"
              value={codCentroDestribuicao}
              onChange={(e) => setCodCentroDestribuicao(e.target.value)}
              placeholder="Código do Centro de Distribuição"
              required
            />
          </label>

          <label>
            <input
              type="text"
              value={codAbrigo}
              onChange={(e) => setCodAbrigo(e.target.value)}
              placeholder="Código do Abrigo"
              required
            />
          </label>

          <h3>Itens do Pedido</h3>
          {items.map((item, index) => (
            <div key={index} className="item-container">
              <label>
              
                <input
                  type="text"
                  value={item.codItem}
                  onChange={(e) => handleItemChange(index, 'codItem', e.target.value)}
                  placeholder="Código do Item"
                  required
                />
              </label>

              <label>
                
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  placeholder="Nome do Item"
                  required
                />
              </label>

              <label>
                Quantidade:
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  placeholder="Quantidade"
                  required
                  min="1"
                />
              </label>

              {items.length > 1 && (
                <button
                  type="button"
                  className="remove-item-button"
                  onClick={() => removeItem(index)}
                >
                  Remover Item
                </button>
              )}
            </div>
          ))}

          <button type="button" className="add-item-button" onClick={addItem}>
            Adicionar Item
          </button>
        </form>

        <div className="button-group">
          <button className="search-button" onClick={enviarPedido}>Enviar Pedido</button>
        </div>
      </div>

      {isPopUpVisible && (
        <div className="pop-up-overlay">
          <div className={`pop-up ${popUpColor}`}>
            <button className="close-button" onClick={closePopUp}>X</button>
            <p>{popUpMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NovoPedido;
