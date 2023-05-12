import { defineStore } from 'pinia';
import { starApi } from '@/api/star';
import useDataStore from '../data';
import intersection from 'lodash/intersection';
import { ls } from '@/utils';

const isDev = import.meta.env.DEV;

export default defineStore('star', {
  state: () => ({
    loading: false,
    staredRepos: ls.get('staredRepos') || [],
  }),
  getters: {
    topics() {
      const list = this.staredRepos.map((i) => i.topics).flat();
      const data = [...new Set(list)].filter(Boolean);
      data.sort();
      return data;
    },
    languageList() {
      const list = this.staredRepos.map((i) => i.language);

      const data = [...new Set(list)].filter(Boolean);
      data.sort();
      return data;
    },
    tagedRepos() {
      const dataStore = useDataStore();
      const { tags, filter } = dataStore;
      const { staredRepos } = this;

      let list = staredRepos.map((repo) => {
        let _tags = tags
          .filter((i) => i.repos.includes(repo.id))
          .map((i) => i.name);

        return {
          ...repo,
          _tags,
        };
      });

      if (filter.isUntaged) {
        list = list.filter((i) => i._tags.length === 0);
      }

      if (filter.language) {
        list = list.filter((i) => i.language === filter.language);
      }

      if (filter.tags.length) {
        if (filter.mode === 'or') {
          list = list.filter(
            (i) => intersection(i._tags, filter.tags).length > 0
          );
        } else {
          list = list.filter(
            (i) =>
              intersection(i._tags, filter.tags).length === filter.tags.length
          );
        }
      }

      if (filter.topics.length) {
        list = list.filter(
          (i) => intersection(i.topics, filter.topics).length > 0
        );
      }

      return list;
    },
  },
  actions: {
    async fetchStaredList(flag) {
      if (!flag && ls.get('staredRepos')) {
        return;
      }
      this.loading = true;
      let starredRepos = [];
      let page = 1;
      // eslint-disable-next-line no-constant-condition
      if (isDev) {
        let list = await starApi.getList({ per_page: 30, page });
        while (page < 4) {
          // 将本页的标星仓库列表合并到总列表中
          starredRepos = starredRepos.concat(list);
          this.staredRepos = starredRepos; // 此处赋值是为了更快的进行渲染，让用户尽快看到数据

          // 继续获取下一页的数据，直到没有数据为止
          page++;
          list = await starApi.getList({ per_page: 100, page });
        }
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
      this.staredRepos = starredRepos.map((i) => {
        const {
          id,
          name,
          full_name,
          default_branch,
          html_url,
          description,
          _tags,
          language,
          topics,
          owner,
        } = i;

        return {
          id,
          name,
          full_name,
          default_branch,
          html_url,
          description,
          _tags,
          language,
          topics,
          owner,
        };
      });
      ls.set('staredRepos', this.staredRepos);
    },
  },
});
