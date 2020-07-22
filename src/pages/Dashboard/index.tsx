import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import LogoImg from '../../assets/github-logo.svg';

import { Title, Form, Users, Error } from './styles';

interface Users {
  login: string;
  avatar_url: string;
  url: string;
  bio: string;
  name: string;
  public_repos: string;
}

const Dashboard: React.FC = () => {
  const [inputError, setInputError] = useState('');
  const [newUser, setNewUser] = useState('');

  const [users, setUsers] = useState<Users[]>(() => {
    const storageUsers = localStorage.getItem('@GitHub:users');

    if (storageUsers) {
      return JSON.parse(storageUsers);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('@GitHub:users', JSON.stringify(users));
  }, [users]);

  async function handleAddUsers(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newUser) {
      setInputError('Digite o nome do usuário');
      return;
    }
    try {
      const response = await api.get<Users>(`users/${newUser}`);

      const usersGit = response.data;

      setUsers([...users, usersGit]);
      setNewUser('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca ou usuário/repositório não existente');
    }
  }

  return (
    <>
      <img src={LogoImg} alt="Github" />
      <Title>Explore usuários do Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddUsers}>
        <input
          placeholder="Digite o nome do usuario"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}
      <Users>
        {users.map((user) => (
          <Link key={user.login} to={`/users/${user.login}`}>
            <img src={user.avatar_url} alt={user.avatar_url} />
            <div>
              <strong>{user.name}</strong>
              <p>{user.bio}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Users>
    </>
  );
};

export default Dashboard;
