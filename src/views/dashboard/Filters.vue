<template>
  <div class="p-20 shadow-inner shadow-lg">
    <a-space wrap>
      <a-button
        :type="seleted.includes(tag.name) ? 'primary' : 'outline'"
        @click="handleClick(tag.name)"
        v-for="(tag, index) in tags"
        :key="index"
      >
        {{ tag.name }}
      </a-button>

      <a-tooltip content="清空选择" position="bottom">
        <a-button status="danger" shape="round" @click="seleted = []">
          <i class="i-mdi-eraser"></i>
        </a-button>
      </a-tooltip>

      <a-tooltip content="编辑标签" position="bottom">
        <a-button shape="round" @click="seleted = []">
          <i class="i-ic-round-mode-edit"></i>
        </a-button>
      </a-tooltip>
    </a-space>
  </div>
</template>

<script setup>
  import { useDataStore } from '@/store';

  const dataStore = useDataStore();

  const seleted = ref([]);
  const tags = computed(() => {
    return dataStore.tags;
  });

  watchEffect(() => {
    dataStore.updateFilter('tags', seleted.value);
  });

  function handleClick(name) {
    const index = seleted.value.indexOf(name);
    if (index > -1) {
      seleted.value.splice(index, 1);
    } else {
      seleted.value.push(name);
    }
  }
</script>

<style lang=""></style>
