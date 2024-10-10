import React, { useState } from 'react';
import './views/pesquisar_usuarios.css';

function HomePage9() {
  const [users] = useState([
    { id: 1, name: 'Gabriel', COD: 1, Funcao: "Voluntário"},
    { id: 2, name: 'Denise', COD: 1, Funcao: "Voluntário"},
    { id: 3, name: 'Denise', COD: 2, Funcao: "SuperAdmin"}
  ]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [queryCOD, setQueryCOD] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);

  const searchUsers = (event) => {
    event.preventDefault();
    const lowerQuery = query.toLowerCase();
    const COD = queryCOD.toUpperCase();
    const results = users.filter(user => 
      (user.Funcao.toLowerCase().includes(lowerQuery)  || lowerQuery === ''
      )  && user.COD == COD);
    setFilteredUsers(results);
    setSearchClicked(true);
  };

  return (
    <div className="wrapper">
            <div className="container">
                <h2>Pesquisar Função em Abrigou/CD</h2>
                <form className="search-form" onSubmit={searchUsers}>
                    <label>
                         Selecione a função:
                        <select onChange={(e) => setQuery(e.target.value)}>
                            <option  value="Voluntário">Voluntário</option>
                            <option  value="SuperAdmin">SuperAdmin</option>
                            <option  value="AdminCd">AdminCd</option>
                            <option  value="AdminAbrigo">adminAbrigo</option>
                        </select>
                    </label>

                    <input
                        type="text"
                        id="search-query"
                        name="search-query"
                        maxlength="50"
                        placeholder="Código do Abrigo ou CD..."
                        value={queryCOD}
                        onChange={(e) => setQueryCOD(e.target.value)}
                    />
                    <button type="submit" className="search-button">Buscar</button>
                </form>

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
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.COD}</td>
                                            <td>{user.Funcao}</td>
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
