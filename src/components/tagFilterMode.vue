<template>
  <a-switch
    @change="handleFilterChange('mode')"
    v-model="filters.mode"
    unchecked-color="#40c463"
    checked-value="or"
    unchecked-value="and"
  >
    <template #checked> 包含任一标签 </template>
    <template #unchecked> 同时包含多个 </template>
  </a-switch>
</template>

<script setup>
  import { useDataStore } from '@/store';

  const dataStore = useDataStore();

  // ---------------------- 标签模式 ----------------------
  const filters = reactive({ mode: 'or', isTaged: false });
  watch(
    () => dataStore.filter,
    (val) => {
      Object.assign(filters, val);
    },
    {
      immediate: true,
    }
  );

  function handleFilterChange(key) {
    dataStore.updateFilter(key, filters[key]);
  }
</script>

<style lang=""></style>
