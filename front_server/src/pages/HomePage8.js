import React, { useState } from 'react';
import './views/pesquisar_usuarios.css';

function HomePage8() {
  const [users] = useState([
    { id: 1, name: 'Gabriel', email: 'gabriel@gmail.com' },
    { id: 2, name: 'Petuco', email: 'petuco@gmail.com' },
    { id: 3, name: 'Ana', email: 'ana@gmail.com' },
    { id: 4, name: 'João', email: 'joao@gmail.com' },
    { id: 5, name: 'Maria', email: 'maria@gmail.com' }
  ]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);

  const searchUsers = (event) => {
    event.preventDefault();
    const lowerQuery = query.toLowerCase();
    const results = users.filter(user => 
      user.name.toLowerCase().includes(lowerQuery) || lowerQuery === ''
    );
    setFilteredUsers(results);
    setSearchClicked(true);
  };

  const deleteUser = (userId) => {
    alert('Usuário ' + userId + ' excluído!');
  };

  return (
    <div className="wrapper">
            <div className="container">
                <h2>Pesquisar Usuários</h2>
                <form className="search-form" onSubmit={searchUsers}>
                    <input
                        type="text"
                        id="search-query"
                        name="search-query"
                        maxlength="50"
                        placeholder="Digite o nome do usuário..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
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
                                        <th>Email</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <button
                                                    className="delete-button"
                                                    onClick={() => deleteUser(user.id)}
                                                >
                                                    Excluir
                                                </button>
                                            </td>
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

export default HomePage8;
