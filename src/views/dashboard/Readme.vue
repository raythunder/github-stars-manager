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

    <a-spin class="block w-full min-h-full" :loading="openLoading">
      <div class="max-w-896px p-20 mx-auto">
        <div
          class="flex items-center mb-20"
          v-if="branchList.length > 1 && visible"
        >
          <a-select v-model="branch" @change="getReadme" :loading="loading">
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
  const defaultBranch = ref('');

  let repo = null;
  let openLoading = ref(false);

  const show = async (data) => {
    repo = data;

    visible.value = true;
    branch.value = repo.default_branch;
    defaultBranch.value = repo.default_branch;

    openLoading.value = true;
    getBranches();
    await getReadme(branch.value);
    openLoading.value = false;
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

    // htmlData.value = replaceLinks(html);
    htmlData.value = replaceImagesSrc(replaceLinks(html), repo);
    console.log(
      '%c [ htmlData.value ]-102',
      'font-size:13px; background:pink; color:#bf2c9f;',
      htmlData.value
    );
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

  function replaceImagesSrc(htmlString, repo) {
    // 匹配所有的 img 标签
    const imgRegex = /<img[^>]*>/g;

    // 匹配 img 标签中的 src 属性值
    const srcRegex = /src\s*=\s*["']([^"']+)["']/;

    // 替换 img 标签中的地址
    const newHtmlString = htmlString.replace(imgRegex, (match) => {
      const srcMatch = match.match(srcRegex);
      if (srcMatch && !srcMatch[1].startsWith('http')) {
        const newSrc = `src="https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${branch.value}/${srcMatch[1]}"`;
        return match.replace(srcRegex, newSrc);
      }
      return match;
    });

    return newHtmlString;
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
