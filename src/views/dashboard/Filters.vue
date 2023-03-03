<template>
  <div class="text-white">
    <div class="bg-gray-600 p-10 pb-2 shadow-inner">
      <a-space wrap>
        <span>标签：</span>

        <a-tag
          :checked="seleted.includes(tag.name)"
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
          <a-button shape="round" @click="seleted = []">
            <i class="i-ic-round-mode-edit"></i>
          </a-button>
        </a-tooltip>
      </a-space>
    </div>

    <div class="bg-gray-500 p-10 pb-2 shadow-inner border-b-1 border-gray-100">
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

  const seleted = ref([]);

  function handleClick(name) {
    const index = seleted.value.indexOf(name);
    if (index > -1) {
      seleted.value.splice(index, 1);
    } else {
      seleted.value.push(name);
    }

    dataStore.updateFilter('tags', seleted.value);
  }

  function clearSelectedTag() {
    seleted.value = [];
    dataStore.updateFilter('tags', '');
  }

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
