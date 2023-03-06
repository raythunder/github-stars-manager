<template>
  <div class="text-white">
    <div class="flex justify-between bg-gray-700 p-10 pb-2 shadow-inner">
      <a-space wrap class="custom-tag">
        <span>标签：</span>

        <a-tag
          :checked="filters.tags.includes(tag.name)"
          checkable
          color="blue"
          @click="handleClick(tag.name)"
          v-for="(tag, index) in dataStore.tags"
          :key="index"
        >
          {{ tag.name }}
        </a-tag>

        <a-tooltip
          content="清空选择"
          position="bottom"
          background-color="#165DFF"
        >
          <a-button shape="circle" @click="clearSelectedTag">
            <template #icon>
              <icon-delete />
            </template>
          </a-button>
        </a-tooltip>

        <a-tooltip
          content="编辑标签"
          position="bottom"
          background-color="#165DFF"
        >
          <a-button shape="circle" @click="filters.tags = []">
            <template #icon>
              <icon-edit />
            </template>
          </a-button>
        </a-tooltip>
      </a-space>
    </div>

    <div class="bg-gray-600 p-10 pb-2">
      <a-space wrap class="custom-tag">
        <span>语言：</span>

        <a-tag
          color="blue"
          checkable
          @click="handleClickLanguage('')"
          :checked="filters.language === ''"
        >
          全部
        </a-tag>

        <a-tag
          :checked="filters.language === lan"
          checkable
          color="blue"
          @click="handleClickLanguage(lan)"
          v-for="(lan, index) in starStore.languageList"
          :key="index"
        >
          {{ lan }}
        </a-tag>
      </a-space>
    </div>
  </div>
</template>

<script setup>
  import { useDataStore, useStarStore } from '@/store';

  const dataStore = useDataStore();
  const starStore = useStarStore();

  const filters = reactive({
    mode: 'or',
    isTaged: false,
    tags: [],
    language: '',
  });

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

  // ---------------------- 标签 ----------------------
  function handleClick(name) {
    const index = filters.tags.indexOf(name);
    if (index > -1) {
      filters.tags.splice(index, 1);
    } else {
      filters.tags.push(name);
    }

    dataStore.updateFilter('tags', filters.tags);

    if (filters.tags.length) {
      dataStore.updateFilter('isUntaged', false);
    }
  }

  function clearSelectedTag() {
    filters.tags = [];
    dataStore.updateFilter('tags', []);
  }

  // ---------------------- 语言 ----------------------
  function handleClickLanguage(name) {
    filters.language = name;
    dataStore.updateFilter('language', name);
  }
</script>

<style lang="less" scoped></style>
