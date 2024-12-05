import React, { useState } from 'react';
import axios from 'axios';  
import './views/pesquisar_usuarios.css';

function HomePage10() {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState({
    user_id: '',
    role: '',
    codEntidade: '',
    phone: '',
    email: ''
  });
  const [searchClicked, setSearchClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle search query submission
  const searchUsers = async (event) => {
    event.preventDefault();
    console.log('Search initiated with query:', query);  // Log the search query

    setLoading(true);
    setError(null);

    // Check if all search fields are empty
    const isEmptySearch = !query.user_id && !query.role && !query.codEntidade && !query.phone && !query.email;
    console.log('Is the search empty?', isEmptySearch);  // Log if search is empty or not

    try {
      let response;

      if (isEmptySearch) {
        console.log('Fetching all users since the search is empty.');
        response = await axios.get('/v1/users/');  // Using relative URL which the proxy will intercept
      } else {
        console.log('Building search parameters...');
        const searchParams = new URLSearchParams();

        if (query.user_id) searchParams.append('user_id', query.user_id);
        if (query.role) searchParams.append('role', query.role);
        if (query.codEntidade) searchParams.append('codEntidade', query.codEntidade);
        if (query.phone) searchParams.append('phone', query.phone);
        if (query.email) searchParams.append('email', query.email);

        console.log('Search parameters:', searchParams.toString());
        response = await axios.get(`/v1/users/?${searchParams.toString()}`);  // Proxy will handle this
      }

      console.log('Users fetched:', response.data);  // Log the fetched users
      setFilteredUsers(response.data);
      setSearchClicked(true);
    } catch (err) {
      // Improved error logging
      console.error('Error fetching users:', err.response || err.message);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(`Query updated: ${name} = ${value}`);  // Log the input changes
  };

  // Function to delete a user
  const deleteUser = async (userId) => {
    console.log('Delete user initiated for ID:', userId);  // Log the delete operation

    try {
      // Send DELETE request to backend (proxy will intercept this)
      await axios.delete(`/v1/users/${userId}`);  
      
      console.log('User deleted successfully:', userId);  // Log successful deletion
      // On success, remove the user from the filtered list (optimistic UI update)
      setFilteredUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
      
      alert('Usuário excluído com sucesso!');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Erro ao excluir usuário!');
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h2>Pesquisar Usuários</h2>
        <form className="search-form" onSubmit={searchUsers}>
          <input
            type="text"
            name="user_id"
            placeholder="ID do usuário"
            value={query.user_id}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="role"
            placeholder="Função"
            value={query.role}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="codEntidade"
            placeholder="Código Entidade"
            value={query.codEntidade}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefone"
            value={query.phone}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={query.email}
            onChange={handleInputChange}
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
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Código Entidade</th>
                    <th>Função</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.codEntidade}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => deleteUser(user._id)} // Pass user ID to delete
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

export default HomePage10;
