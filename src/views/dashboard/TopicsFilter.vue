<template>
  <a-space size="medium" direction="vertical" class="p-10">
    <div> Topics </div>

    <a-input placeholder="筛选主题" v-model="keyword" allow-clear />

    <a-space wrap v-if="selected.length">
      <a-tag
        checkable
        color="blue"
        bordered
        @click="handleClickTopic(topic)"
        v-for="(topic, index) in selected"
        :key="index"
      >
        {{ topic }}
      </a-tag>
    </a-space>

    <a-button @click="clearSelectedTag" long type="outline">clear</a-button>

    <a-space wrap>
      <a-tag
        :checked="selected.includes(topic)"
        checkable
        color="blue"
        bordered
        @click="handleClickTopic(topic)"
        v-for="(topic, index) in filterTopic"
        :key="index"
      >
        {{ topic }}
      </a-tag>
    </a-space>
  </a-space>
</template>

<script setup>
  import { useDataStore, useStarStore } from '@/store';

  const dataStore = useDataStore();
  const starStore = useStarStore();

  const keyword = ref('');

  const selected = ref([]);

  const filterTopic = computed(() => {
    return starStore.topics.filter((topic) => {
      return topic.includes(keyword.value) && !selected.value.includes(topic);
    });
  });

  function handleClickTopic(name) {
    const index = selected.value.indexOf(name);
    if (index > -1) {
      selected.value.splice(index, 1);
    } else {
      selected.value.push(name);
    }

    dataStore.updateFilter('topics', selected.value);
  }

  function clearSelectedTag() {
    selected.value = [];
    dataStore.updateFilter('topics', '');
  }
</script>

<style lang=""></style>
