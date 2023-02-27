import { ls } from '@/utils';
const TOKEN_KEY = 'token';

const isLogin = () => {
  return !!ls.get(TOKEN_KEY);
};

const getToken = () => {
  return ls.get(TOKEN_KEY);
};

const setToken = (token) => {
  ls.set(TOKEN_KEY, token);
};

const clearToken = () => {
  ls.remove(TOKEN_KEY);
};

export { isLogin, getToken, setToken, clearToken };
