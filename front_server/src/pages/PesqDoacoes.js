import React, { useState } from 'react';
import axios from 'axios';
import './views/pesqDoacoes.css'

const PesqDoacoes = () => {
  const [idDoacao, setIdDoacao] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [doacaoData, setDoacaoData] = useState(null);
  const [doacaoList, setDoacaoList] = useState([]);
  const [error, setError] = useState('');

  // Fetch Doacao by ID
  const fetchDoacaoById = async () => {
    try {
      const response = await axios.get(`/v1/doacao/${idDoacao}`); // Now using the relative URL
      setDoacaoData(response.data);
      setError('');
    } catch (err) {
      setError('Doação não encontrada');
      setDoacaoData(null);
    }
  };

  // Fetch Doacoes by Date Range
  const fetchDoacoesByDate = async () => {
    if (!startDate) {
      setError('A data de início é obrigatória.');
      return;
    }

    try {
      const response = await axios.get('/v1/doacao/date', {
        params: {
          startDate: startDate,
          endDate: endDate || '', // If endDate is not provided, send an empty string
        },
      });
      setDoacaoList(response.data);
      setError('');
    } catch (err) {
      setError('Erro ao buscar doações por data');
      setDoacaoList([]);
    }
  };

  return (
    <div className="pesq-doacoes-container" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Pesquisar Doações</h1>

      {/* Search by ID */}
      <div>
        <h2>Buscar Doação por ID</h2>
        <input
          type="number"
          placeholder="ID da Doação"
          value={idDoacao}
          onChange={(e) => setIdDoacao(e.target.value)}
        />
        <button onClick={fetchDoacaoById}>Buscar</button>

        {doacaoData && (
          <div style={{ marginTop: '20px' }}>
            <h3>Doação Encontrada:</h3>
            <p>ID: {doacaoData.idDoacao}</p>
            <p>Código do Doador: {doacaoData.codDoador}</p>
            <p>Centro de Distribuição: {doacaoData.codCD}</p>
            {/* Display more fields as needed */}
          </div>
        )}
      </div>

      {/* Search by Date */}
      <div style={{ marginTop: '40px' }}>
        <h2>Buscar Doações por Data</h2>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Data de Início"
          required
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="Data de Fim"
        />
        <button onClick={fetchDoacoesByDate}>Buscar</button>

        {doacaoList.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3>Lista de Doações</h3>
            <ul>
              {doacaoList.map((doacao) => (
                <li key={doacao.idDoacao}>
                  {doacao.codDoador} - {doacao.codCD} ({doacao.dataDoacao})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Error Handling */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PesqDoacoes;
