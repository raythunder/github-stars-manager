import axios from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';
import { ls } from '@/utils';

axios.defaults.baseURL = 'https://api.github.com';

axios.interceptors.request.use(
  (config) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response) => {
    const res = response.data;

    return res;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/#/init';

      ls.set('token', '');

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    Message.error({
      content: error.response.data.message || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
