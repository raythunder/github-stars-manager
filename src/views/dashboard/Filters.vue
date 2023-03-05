<template>
  <div class="text-white">
    <div class="flex justify-between bg-gray-700 p-10 pb-2 shadow-inner">
      <a-space wrap>
        <span>标签：</span>

        <a-tag
          :checked="selected.includes(tag.name)"
          checkable
          color="blue"
          bordered
          @click="handleClick(tag.name)"
          v-for="(tag, index) in dataStore.tags"
          :key="index"
        >
          {{ tag.name }}
        </a-tag>

        <a-tooltip content="清空选择" position="bottom">
          <a-button status="danger" shape="round" @click="clearSelectedTag">
            <i class="i-mdi-eraser"></i>
          </a-button>
        </a-tooltip>

        <a-tooltip content="编辑标签" position="bottom">
          <a-button shape="round" @click="selected = []">
            <i class="i-ic-round-mode-edit"></i>
          </a-button>
        </a-tooltip>
      </a-space>

      <div>
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
    </div>

    <div class="bg-gray-600 p-10 pb-2">
      <a-space wrap>
        <span>语言：</span>

        <a-tag
          color="blue"
          checkable
          bordered
          @click="handleClickLanguage('')"
          :checked="seletedLanguage === ''"
        >
          全部
        </a-tag>

        <a-tag
          :checked="seletedLanguage === lan"
          checkable
          color="blue"
          bordered
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

  // ---------------------- 标签 ----------------------
  const selected = ref([]);
  function handleClick(name) {
    const index = selected.value.indexOf(name);
    if (index > -1) {
      selected.value.splice(index, 1);
    } else {
      selected.value.push(name);
    }

    dataStore.updateFilter('tags', selected.value);
  }

  function clearSelectedTag() {
    selected.value = [];
    dataStore.updateFilter('tags', '');
  }

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

  // ---------------------- 语言 ----------------------
  const seletedLanguage = ref('');
  function handleClickLanguage(name) {
    seletedLanguage.value = name;
    dataStore.updateFilter('language', name);
  }
</script>

<style lang="less" scoped>
  :deep .arco-tag {
    color: white;
  }
  :deep .arco-tag:hover {
    color: black;
  }

  :deep .arco-tag-checked:hover {
    color: rgb(var(--blue-6));
  }
</style>
