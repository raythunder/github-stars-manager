import { defineStore } from 'pinia';
import { gistApi } from '@/api/gists';

import { GIST_INFO } from '@/const';
import { ls } from '@/utils';
import useStarStore from '../star';

export default defineStore('data', {
  state: () => ({
    tags: [],
    updateTime: 0,
  }),
  actions: {
    async fetchGistData() {
      const content = await fetchGistData();

      this.$patch(content);

      const starStore = useStarStore();
      starStore.fetchStaredList();
    },
  },
});

async function fetchGistContent(gistId, gist) {
  const { files } = await gistApi.getItem(gist?.id || gistId);
  return JSON.parse(files[GIST_INFO.name].content);
}

async function fetchGistData() {
  let content = null;

  const gistId = ls.get('gistId');

  if (gistId) {
    content = await fetchGistContent(gistId);

    const localContent = ls.get('localContent');
    // 本地数据更新时间大于gist数据更新时间，使用本地数据
    content =
      localContent?.updateTime > content?.updateTime ? localContent : content;
  } else {
    const list = await gistApi.getList();

    // 查找用于存储数据的gist
    const gist = list.find(
      (item) => item.description === GIST_INFO.description
    );

    if (gist) {
      content = await fetchGistContent(null, gist);

      ls.set('gistId', gist.id);
    } else {
      // 创建gist
      content = { updateTime: Date.now(), tags: [] };

      const {
        data: { id },
      } = await gistApi.addItem(content);
      ls.set('gistId', id);
    }
  }

  ls.set('localContent', content);
  return content;
}
