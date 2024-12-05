import React, { useState } from "react";
import axios from "axios";
import BarcodeScanner from "../components/Barcode"; // Importing BarcodeScanner
import './views/doacoes.css';

const Doacoes = () => {
  const [codDoador, setCodDoador] = useState("");
  const [codCD, setCodCD] = useState("");
  const [newItem, setNewItem] = useState({
    nome: "",
    unidade: "",
    qtd: 1,
    categoria: "",
  });
  const [items, setItems] = useState([]);
  const [barcodeData, setBarcodeData] = useState(""); // Store barcode data

  const handleBarcodeDetected = async (barcode) => {
    setBarcodeData(barcode);
    try {
      const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      const product = response.data.product;

      if (product) {
        setNewItem({
          nome: product.product_name || "Unknown product",
          unidade: product.quantity || "N/A",
          categoria: product.categories || "N/A",
          qtd: 1, // Set a default quantity
        });
      } else {
        alert("Product not found in Open Food Facts.");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      alert("Failed to fetch product data.");
    }
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const addItemToList = (e) => {
    e.preventDefault();
    if (newItem.nome && newItem.unidade && newItem.qtd && newItem.categoria) {
      setItems((prevItems) => [...prevItems, newItem]);
      setNewItem({ nome: "", unidade: "", qtd: 1, categoria: "" });
    } else {
      alert("Please fill all fields before adding an item.");
    }
  };

  const sendItems = async () => {
    if (!codDoador || !codCD) {
      alert("Please provide both 'codDoador' and 'codCD'.");
      return;
    }

    for (const item of items) {
      const doacaoRequest = {
        codDoador: parseInt(codDoador),
        codCD: parseInt(codCD),
        itens: [item],
      };

      try {
        const response = await axios.post("/v1/doacao", doacaoRequest);
        console.log("Item sent successfully:", response.status);
      } catch (error) {
        console.error("Error sending item:", error);
      }
    }

    alert("All items have been sent!");
    setItems([]);
  };

  return (
    <div className="doacoes-container">
      <div className="doacoes-form">
        <h1>Cadastro de Doações</h1>
        <form className="form-info">
          <div>
            <label>Código do Doador (Email): </label>
            <input
              type="email"
              value={codDoador}
              onChange={(e) => setCodDoador(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Código do Centro de Distribuição: </label>
            <input
              type="text"
              value={codCD}
              onChange={(e) => setCodCD(e.target.value)}
              required
            />
          </div>
        </form>
        <h2>Adicionar Item</h2>
        <form className="form-doacao" onSubmit={addItemToList}>
          <div>
            <label>Nome: </label>
            <input
              type="text"
              name="nome"
              value={newItem.nome}
              onChange={handleNewItemChange}
              required
            />
          </div>
          <div>
            <label>Unidade: </label>
            <input
              type="text"
              name="unidade"
              value={newItem.unidade}
              onChange={handleNewItemChange}
              required
            />
          </div>
          <div>
            <label>Quantidade: </label>
            <input
              type="number"
              name="qtd"
              value={newItem.qtd}
              onChange={handleNewItemChange}
              required
            />
          </div>
          <div>
            <label>Categoria: </label>
            <input
              type="text"
              name="categoria"
              value={newItem.categoria}
              onChange={handleNewItemChange}
              required
            />
          </div>
          <button className="add-item" type="submit">Adicionar Item</button>
        </form>
      </div>

      <div className="doacoes-items-list">
        <h3>Lista de Itens</h3>
        {items.length > 0 ? (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.nome} - {item.qtd} {item.unidade} ({item.categoria})
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum item adicionado ainda.</p>
        )}

        <button onClick={sendItems}>Enviar Todos os Itens</button>
      </div>
      <div className="doacoes-barcode">
          <h3>Escanear Código de Barras</h3>
          <BarcodeScanner onBarcodeDetected={handleBarcodeDetected} style={{ width: "25%", height: "25%" }} />
          {barcodeData && (
            <p>Scanned Barcode: {barcodeData}</p>
          )}
        </div>

    </div>
  );
};

export default Doacoes;