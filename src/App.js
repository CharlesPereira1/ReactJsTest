import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);

      console.log(repositories);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repository ${Date.now()}`,
      url: 'https://mail.google.com/mail/u/0/#inbox',
      techs: 'JavaScript, CSS, HTML'
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`, {
      params: {
        id,
      }
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repos =>
          <li key={repos.id}>
            {repos.title}
            <button onClick={() => handleRemoveRepository(repos.id)}>
              Remover
          </button>
          </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
