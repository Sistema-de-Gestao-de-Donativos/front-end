import React, { useState } from 'react';
import axios from 'axios';  // Import axios for API calls
import './views/pesquisar_usuarios.css';

function HomePage9() {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState('voluntario');  // Default to 'voluntario' (or any default role)
  const [queryCOD, setQueryCOD] = useState('');  // For the code of Abrigo or CD
  const [searchClicked, setSearchClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchUsers = async (event) => {
    event.preventDefault();

    
    if (!query || !queryCOD) {
      alert("Por favor, preencha ambos os campos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
     
      const response = await axios.get(`/v1/users/${query.toLowerCase()}/${queryCOD.toUpperCase()}`);
      const results = response.data;

      console.log("Users fetched:", results);

      setFilteredUsers(results);
      setSearchClicked(true);
    } catch (err) {
      // Handle errors
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h2>Pesquisar Função em Abrigou/CD</h2>
        <form className="search-form" onSubmit={searchUsers}>
          <label>
            Selecione a função:
            <select onChange={(e) => setQuery(e.target.value)} value={query}>
              <option value="voluntario">Voluntário</option>
              <option value="superadmin">SuperAdmin</option>
              <option value="adminCd">AdminCd</option>
              <option value="adminAbrigo">AdminAbrigo</option>
            </select>
          </label>

          <input
            type="text"
            id="search-query"
            name="search-query"
            maxLength="50"
            placeholder="Código do Abrigo ou CD..."
            value={queryCOD}
            onChange={(e) => setQueryCOD(e.target.value)}
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Carregando...' : 'Buscar'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {searchClicked && (
          <div id="user-list" className="user-list">
            {filteredUsers.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Usuário</th>
                    <th>Código Abrigo/CD</th>
                    <th>Função</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.codEntidade}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-results">Nenhum usuário encontrado.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage9;
