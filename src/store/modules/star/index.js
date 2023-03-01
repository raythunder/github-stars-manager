import { defineStore } from 'pinia';
import { starApi } from '@/api/star';
import useDataStore from '../data';

export default defineStore('star', {
  state: () => ({
    loading: false,
    staredRepos: [],
  }),
  getters: {
    tagedRepos() {
      const dataStore = useDataStore();
      const { tags } = dataStore;
      const { staredRepos } = this;

      return staredRepos.map((repo) => {
        const _tags = tags
          .filter((i) => i.repos.includes(repo.id))
          .map((i) => i.name);

        return {
          ...repo,
          _tags,
        };
      });
    },
  },
  actions: {
    async fetchStaredList() {
      this.loading = true;
      let starredRepos = [];
      let page = 1;
      // eslint-disable-next-line no-constant-condition
      if (true) {
        let list = await starApi.getList({ per_page: 30, page });
        starredRepos = starredRepos.concat(list);
      } else {
        let list = await starApi.getList({ per_page: 100, page });

        while (list.length > 0) {
          // 将本页的标星仓库列表合并到总列表中
          starredRepos = starredRepos.concat(list);
          this.staredRepos = starredRepos; // 此处赋值是为了更快的进行渲染，让用户尽快看到数据

          // 继续获取下一页的数据，直到没有数据为止
          page++;
          list = await starApi.getList({ per_page: 100, page });
        }
      }

      this.loading = false;
      this.staredRepos = starredRepos;
    },
  },
});
