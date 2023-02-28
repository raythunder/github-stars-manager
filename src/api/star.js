import http from 'axios';
// https://docs.github.com/en/rest/activity/starring?apiVersion=2022-11-28

export const starApi = {
  getList(params) {
    return http.get('/user/starred', { params });
  },
  starRepo({ owner, repo }) {
    return http.put(`/user/starred/${owner}/${repo}`);
  },
  unStarRepo({ owner, repo }) {
    return http.delete(`/user/starred/${owner}/${repo}`);
  },
  getReadme({ owner, repo }) {
    return http.get(`/repos/${owner}/${repo}/readme`);
  },
  renderReadme(text) {
    // https://docs.github.com/zh/rest/markdown?apiVersion=2022-11-28#render-a-markdown-document
    return http.post(`/markdown`, {
      text,
      mode: 'markdown',
    });
  },
};
