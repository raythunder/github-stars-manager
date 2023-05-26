<template>
  <a-space
    direction="vertical"
    class="p-10 min-h-full bg-gray-500 text-white w-full"
  >
    <div> {{ $t('topics') }} </div>

    <a-space
      wrap
      v-if="filters.topics.length"
      class="border-b-1 border-gray-300 w-full custom-tag"
    >
      <a-tag
        checkable
        color="blue"
        bordered
        @click="handleClickTopic(topic)"
        v-for="topic in filters.topics"
        :key="topic"
      >
        {{ topic }}
      </a-tag>

      <a-tooltip
        :content="$t('clear_selected')"
        position="bottom"
        background-color="#165DFF"
      >
        <a-button shape="circle" @click="clearSelectedTag">
          <template #icon>
            <icon-delete />
          </template>
        </a-button>
      </a-tooltip>
    </a-space>

    <a-input :placeholder="$t('filter_topic')" v-model="keyword" allow-clear />

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

  const filters = reactive({
    mode: 'or',
    isTaged: false,
    tags: [],
    language: '',
    topics: [],
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

  const keyword = ref('');

  const selected = ref([]);

  const filterTopic = computed(() => {
    return starStore.topics.filter((topic) => {
      return topic.includes(keyword.value) && !filters.topics.includes(topic);
    });
  });

  function handleClickTopic(name) {
    const index = filters.topics.indexOf(name);
    if (index > -1) {
      filters.topics.splice(index, 1);
    } else {
      filters.topics.push(name);
    }

    dataStore.updateFilter('topics', filters.topics);
  }

  function clearSelectedTag() {
    filters.topics = [];
    dataStore.updateFilter('topics', []);
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
