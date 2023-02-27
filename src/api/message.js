import axios from 'axios';

export function queryMessageList() {
  return axios.post('/api/message/list');
}

export function setMessageStatus(data) {
  return axios.post('/api/message/read', data);
}

export function queryChatList() {
  return axios.post('/api/chat/list');
}
