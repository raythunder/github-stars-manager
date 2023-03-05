<template>
  <div class="flex flex-col h-100vh overflow-hidden">
    <Header></Header>

    <Filters></Filters>

    <div class="flex-1 overflow-hidden">
      <a-split v-model:size="splitSize" style="height: 100%">
        <template #first> <TopicsFilter></TopicsFilter> </template>
        <template #second>
          <List @click="handleClick"></List>
        </template>
      </a-split>
    </div>

    <Readme ref="readme"></Readme>
  </div>
</template>

<script setup>
  import Header from './Header.vue';
  import Filters from './Filters.vue';
  import TopicsFilter from './TopicsFilter.vue';
  import List from './List.vue';
  import Readme from './Readme.vue';

  const readme = ref();
  async function handleClick(repo) {
    readme.value.show(repo);
  }

  const splitSize = ref('300px');
</script>

<style lang="less">
  .clipTxt {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
