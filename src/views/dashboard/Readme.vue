<template>
  <a-drawer
    width="80%"
    :visible="visible"
    unmount-on-close
    @cancel="visible = false"
    @ok="visible = false"
    @close="handleClose"
  >
    <template #title> README.md </template>
    <a-spin :loading="loading" class="w-full p-20 min-h-full">
      <div class="flex items-center mb-20" v-if="branchList.length > 1">
        <span class="flex-shrink-0">分支：</span>
        <a-select v-model="branch" @change="getReadme">
          <a-option
            v-for="item in branchList"
            :key="item.name"
            :value="item.name"
          >
            {{ item.name }}
          </a-option>
        </a-select>
      </div>

      <div class="markdown-body" v-html="htmlData"> </div>
    </a-spin>
  </a-drawer>
</template>

<script setup>
  import { to } from '@/utils';
  import { starApi } from '@/api/star';

  const visible = ref(false);
  const loading = ref(false);

  const htmlData = ref('');

  const branch = ref('');

  let repo = null;
  const show = (data) => {
    repo = data;

    visible.value = true;
    branch.value = repo.default_branch;

    getBranches();
    getReadme(branch.value);
  };

  // 获取readme.md文件内容
  async function getReadme(branch) {
    loading.value = true;

    const [err, data] = await to(
      starApi.getReadme({
        owner: repo.owner.login,
        repo: repo.name,
        branch,
      })
    );
    if (err) {
      loading.value = false;
      return;
    }

    const [err2, html] = await to(
      starApi.renderReadme(decodeURIComponent(escape(atob(data.content))))
    );
    if (err2) {
      loading.value = false;
      return;
    }

    htmlData.value = replaceLinks(html);
    loading.value = false;
  }

  // 获取分支信息
  const branchList = ref([]);
  async function getBranches() {
    branchList.value = await starApi.getBranches({
      owner: repo.owner.login,
      repo: repo.name,
    });
  }

  // 用正则表达式替换超链接
  function replaceLinks(html) {
    const pattern = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/gi;
    const target = 'target="_blank" rel="noopener noreferrer" href="$1"';
    return html.replace(pattern, `<a ${target}`);
  }

  function handleClose() {
    htmlData.value = '';
  }

  defineExpose({
    show,
  });
</script>

<style lang="less">
  @import '@/assets/github-markdown.css';
</style>
