<template>
  <div
    class="bg-#24292f text-white w-full left-0 top-0 flex p-10 justify-between items-center w-full shadow-md relative z-10"
  >
    <div class="flex items-center">
      <a :href="userInfo.html_url" target="_blank" class="text-white">
        <a-avatar :size="32" class="mr-10">
          <img alt="avatar" :src="userInfo.avatar_url" />
        </a-avatar>

        <span>{{ userInfo.login }}</span>
      </a>

      <div
        class="flex justify-center items-center text-yellow-400 ml-20"
        v-if="starData.loading"
      >
        <starLoading :loading="starData.loading" class="mr-10"></starLoading>
        <span>正在获取收藏列表...</span>
      </div>
    </div>

    <a-space size="large" class="custom-tag">
      <TagFilterMode></TagFilterMode>

      <a-radio-group
        v-model="filters.isUntaged"
        @change="handleFilterChange('isUntaged', $event)"
      >
        <a-radio :value="true">
          <template #radio="{ checked }">
            <a-tag color="blue" :checked="checked" checkable>
              未标记的收藏
            </a-tag>
          </template>
        </a-radio>
        <a-radio :value="false">
          <template #radio="{ checked }">
            <a-tag color="blue" :checked="checked" checkable> 全部收藏 </a-tag>
          </template>
        </a-radio>
      </a-radio-group>
    </a-space>
  </div>
</template>

<script setup>
  import starLoading from '@/components/starLoading.vue';
  import { useUserStore, useDataStore, useStarStore } from '@/store';
  import TagFilterMode from '@/components/tagFilterMode.vue';

  const userInfo = useUserStore();
  const dataStore = useDataStore();
  const starData = useStarStore();
  const filters = reactive({ mode: 'or', isUntaged: false });

  watch(
    () => dataStore.filter,
    (val) => {
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

<style lang="less" scoped>
  :deep .arco-radio-group .arco-radio {
    margin-right: 5px;
  }
</style>
