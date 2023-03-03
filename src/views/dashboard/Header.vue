<template>
  <div
    class="bg-#24292f text-white w-full left-0 top-0 flex p-10 justify-between items-center w-full shadow-md relative z-10"
  >
    <a :href="userInfo.html_url" target="_blank" class="text-white">
      <a-avatar :size="32" class="mr-10">
        <img alt="avatar" :src="userInfo.avatar_url" />
      </a-avatar>

      <span>{{ userInfo.login }}</span>
    </a>

    <a-space size="large">
      <div>
        标签筛选模式：
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
      </div>

      <div>
        标记筛选：
        <a-switch
          @change="handleFilterChange('isUntaged')"
          v-model="filters.isUntaged"
          unchecked-color="#40c463"
        >
          <template #checked> 未标记</template>
          <template #unchecked> 全部</template>
        </a-switch>
      </div>
    </a-space>
  </div>
</template>

<script setup>
  import { useUserStore, useDataStore } from '@/store';

  const userInfo = useUserStore();
  const dataStore = useDataStore();
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