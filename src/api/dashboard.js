import axios from 'axios';

export function queryContentData() {
  return axios.get('/api/content-data');
}

export function queryPopularList(params) {
  return axios.get('/api/popular/list', { params });
}
