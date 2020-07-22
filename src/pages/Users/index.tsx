import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/github-logo.svg';

import { Header, UserInfo, Repositories } from './styles';

interface UsersFinder {
  name: string;
  login: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  public_gists: number;
}

interface Repos {
  id: number;
  name: string;
  html_url: string;
  description: string;
  owner: {
    login: string;
  };
}

interface UsersParams {
  user: string;
}

const Repository: React.FC = () => {
  const [users, setUsers] = useState<UsersFinder | null>(null);
  const [repos, setRepos] = useState<Repos[]>([]);

  const { params } = useRouteMatch<UsersParams>();

  useEffect(() => {
    api.get(`users/${params.user}`).then((response) => {
      setUsers(response.data);
    });

    api.get(`users/${params.user}/repos`).then((response) => {
      setRepos(response.data);
    });
  }, [params.user]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Logo" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {users && (
        <UserInfo>
          <header>
            <img src={users.avatar_url} alt={users.login} />
            <div>
              <strong>{users.name}</strong>
              <p>{users.bio}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{users.public_repos}</strong>
              <span>Public Repos</span>
            </li>
            <li>
              <strong>{users.followers}</strong>
              <span>Followers</span>
            </li>
            <li>
              <strong>{users.public_gists}</strong>
              <span>Gists Public</span>
            </li>
          </ul>
        </UserInfo>
      )}

      <Repositories>
        {repos.map((repo) => (
          <a key={repo.id} href={repo.html_url}>
            <div>
              <strong>{repo.name}</strong>
              <p>{repo.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Repository;
