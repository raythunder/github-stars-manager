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
      <div class="markdown-body" v-html="htmlData"> </div>
    </a-spin>
  </a-drawer>
</template>

<script setup>
  import { starApi } from '@/api/star';

  const visible = ref(false);
  const loading = ref(false);

  const htmlData = ref('');
  // 用正则表达式替换超链接
  function replaceLinks(html) {
    const pattern = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/gi;
    const target = 'target="_blank" rel="noopener noreferrer" href="$1"';
    return html.replace(pattern, `<a ${target}`);
  }
  const show = async (repo) => {
    visible.value = true;
    loading.value = true;

    const data = await starApi.getReadme({
      owner: repo.owner.login,
      repo: repo.name,
    });

    const html = await starApi.renderReadme(
      decodeURIComponent(escape(atob(data.content)))
    );

    htmlData.value = replaceLinks(html);

    loading.value = false;
  };

  function handleClose() {
    console.log(
      '%c [ htmlData ]-52',
      'font-size:13px; background:pink; color:#bf2c9f;',
      htmlData
    );
    htmlData.value = '';
  }

  defineExpose({
    show,
  });
</script>

<style lang="less">
  @import '@/assets/github-markdown.css';
</style>
