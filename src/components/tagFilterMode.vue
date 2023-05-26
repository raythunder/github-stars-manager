<template>
  <a-switch
    @change="handleFilterChange('mode')"
    v-model="filters.mode"
    unchecked-color="#40c463"
    checked-value="or"
    unchecked-value="and"
  >
    <template #checked> {{ $t('containing_any_tag') }} </template>
    <template #unchecked> {{ $t('containing_multiple_tag') }} </template>
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
