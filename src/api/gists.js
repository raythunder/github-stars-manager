import { GIST_INFO } from '@/const';
import http from 'axios';
// https://docs.github.com/en/rest/gists/gists?apiVersion=2022-11-28

export const gistApi = {
  getList() {
    return http.get('/gists');
  },
  getItem(id) {
    return http.get(`/gists/${id}`);
  },
  addItem(data) {
    const params = {
      description: GIST_INFO.description,
      public: false, // private
      files: {
        [GIST_INFO.name]: {
          content: JSON.stringify(data),
        },
      },
    };

    return http.post('/gists', params);
  },
  updateItem(id, data) {
    const params = {
      files: {
        [GIST_INFO.name]: {
          content: JSON.stringify(data),
        },
      },
    };

    return http.patch(`/gists/${id}`, params);
  },
};
