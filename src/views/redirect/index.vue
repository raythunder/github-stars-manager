<template>
  <div></div>
</template>

<script setup>
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const gotoPath = route.params.path;
  router.replace({ path: gotoPath });
</script>

<style scoped lang="less"></style>
