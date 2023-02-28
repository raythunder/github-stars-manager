import axios from 'axios';

export function getUser() {
  return axios.get('/user');
}

export function login(data) {
  return axios.post('/login/auth', data);
}

export function logout() {
  return axios.post('/login/logout');
}

export function getUserInfo() {
  return axios.post('/login/getAuthorizationInfo');
}

export function authsmsneed() {
  return axios.post('/login/authsmsneed');
}

export function sendsms() {
  return axios.post('/login/authsmssend');
}

export function getMenuList() {
  return axios.post('/api/user/menu');
}
