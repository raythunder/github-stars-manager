<template>
  <div class="flex flex-col h-100vh overflow-hidden">
    <Header></Header>

    <Filters></Filters>

    <List @click="handleClick"></List>

    <Readme ref="readme"></Readme>
  </div>
</template>

<script setup>
  import Header from './Header.vue';
  import Filters from './Filters.vue';
  import List from './List.vue';
  import Readme from './Readme.vue';

  const readme = ref();
  async function handleClick(repo) {
    readme.value.show(repo);
  }
</script>

<style lang="less">
  .clipTxt {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
