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
  // https://docs.github.com/en/rest/branches/branches?apiVersion=2022-11-28
  getBranches({ owner, repo }) {
    return http.get(`/repos/${owner}/${repo}/branches`);
  },
  // https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-a-repository-readme
  getReadme({ owner, repo, branch }) {
    const url = `/repos/${owner}/${repo}/readme`;
    if (branch) {
      return http.get(url, { params: { ref: branch } });
    }
    return http.get(url);
  },
  // https://docs.github.com/en/rest/markdown?apiVersion=2022-11-28#render-a-markdown-document
  renderReadme(text) {
    return http.post(`/markdown`, {
      text,
      mode: 'markdown',
    });
  },
};
