/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable consistent-return */
import React, {
  createContext, useMemo, useState,
} from 'react';
import Router from 'next/router';
import FetchApi, { axiosConnection } from '../api';
import { showAlert } from '../events/events';
import Session from '../session';

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = async ({ email, password }) => {
    const { status, data } = await FetchApi.post('/auth/login', {
      email,
      password,
    });

    if (status !== 200) {
      return showAlert('Erro ao fazer login', data.message);
    }

    const { data: { user: userData } } = data;

    // Set cookie with user data
    Session.set(userData);

    // Update state
    setUser(userData);

    // Set token in axios
    axiosConnection.defaults.headers.Authorization = userData.token;

    return Router.push('/');
  };

  const signUp = async ({ username, email, password }) => {
    const { status, data } = await FetchApi.post('/auth/register', {
      username,
      email,
      password,
    });

    if (status !== 200) {
      return showAlert('Erro ao fazer cadastro', data.message);
    }

    const { data: { user: userData, message } } = data;

    // Set cookie with user data
    Session.set(userData);

    // Update state
    setUser(userData);

    // Set token in axios
    axiosConnection.defaults.headers.Authorization = userData.token;

    // Redirect to home page
    return showAlert('Cadastro', message, () => Router.push('/'));
  };

  const syncUserData = async () => {
    const { status, data: { data } } = await FetchApi.get('/user');

    if (status !== 200) {
      return showAlert('Erro interno', 'Erro ao obter dados do usuário, faça login novamente para continuar', () => Router.push('/login'));
    }

    setUser(data);
  };

  const value = useMemo(() => ({
    user, signIn, signUp, syncUserData,
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
