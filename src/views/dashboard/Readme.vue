<template>
  <a-drawer
    height="95%"
    placement="bottom"
    :visible="visible"
    unmount-on-close
    @cancel="visible = false"
    @ok="visible = false"
    @close="handleClose"
  >
    <template #title> README.md </template>

    <div class="text-center">
      <a-spin v-if="loading" :loading="loading"> </a-spin>
    </div>

    <div class="max-w-896px p-20 mx-auto" v-if="!loading">
      <div
        class="flex items-center mb-20"
        v-if="branchList.length > 1 && visible"
      >
        <a-select v-model="branch" @change="getReadme">
          <template #prefix>
            <i class="text-#0969da i-mdi-source-branch"> </i>
          </template>
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

      <div class="text-center" v-if="!loading && !htmlData">
        <a-tooltip position="bottom">
          <template #content> 该分支没有README.md... </template>
          <i
            class="text-size-50 text-gray-200 i-ic-twotone-catching-pokemon"
          ></i>
        </a-tooltip>
      </div>
    </div>
  </a-drawer>
</template>

<script setup>
  import { to } from '@/utils';
  import { starApi } from '@/api/star';

  const visible = ref(false);
  const loading = ref(false);

  const htmlData = ref('');

  const branch = ref('');
  const defaultBranch = ref('');

  let repo = null;
  const show = (data) => {
    repo = data;

    visible.value = true;
    branch.value = repo.default_branch;
    defaultBranch.value = repo.default_branch;

    getBranches();
    getReadme(branch.value);
  };

  // 获取readme.md文件内容
  async function getReadme(branch) {
    loading.value = true;
    htmlData.value = '';

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
    const list = await starApi.getBranches({
      owner: repo.owner.login,
      repo: repo.name,
    });

    const extraBranch = list.filter(
      (item) => item.name !== repo.default_branch
    );

    const defaultBranch = list.find(
      (item) => item.name === repo.default_branch
    );

    // 置顶默认分支
    branchList.value = [defaultBranch, ...extraBranch];
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
