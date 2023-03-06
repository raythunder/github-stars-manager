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

    <div class="flex justify-center items-center text-yellow-400">
      <starLoading class="mr-10"></starLoading> 正在获取收藏列表...
    </div>

    <a-space size="large">
      <TagFilterMode></TagFilterMode>

      <div>
        <a-switch
          @change="handleFilterChange('isUntaged')"
          v-model="filters.isUntaged"
          unchecked-color="#40c463"
        >
          <template #checked> 未标记的收藏</template>
          <template #unchecked> 全部收藏</template>
        </a-switch>
      </div>
    </a-space>
  </div>
</template>

<script setup>
  import starLoading from '@/components/starLoading.vue';
  import { useUserStore, useDataStore } from '@/store';
  import TagFilterMode from '@/components/tagFilterMode.vue';

  const userInfo = useUserStore();
  const dataStore = useDataStore();
  const filters = reactive({ mode: 'or', isUntaged: false });

  watch(
    () => dataStore.filter,
    (val) => {
      console.log(
        '%c [ val ]-41',
        'font-size:13px; background:pink; color:#bf2c9f;',
        val
      );
      Object.assign(filters, val);
    },
    {
      immediate: true,
      deep: true,
    }
  );

  function handleFilterChange(key) {
    dataStore.updateFilter(key, filters[key]);
  }
</script>

<style lang=""></style>
