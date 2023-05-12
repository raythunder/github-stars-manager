<template>
  <div class="flex flex-col h-full">
    <div class="p-20px shadow-lg">
      <a-input
        v-model="keywords"
        placeholder="输入筛选仓库名或描述"
        allow-clear
      />
    </div>

    <div class="flex-1 overflow-auto list-wrap">
      <div
        class="flex w-full group border-b border-#d8dee4 hover:bg-gray-50 relative overflow-hidden"
        v-for="(repo, index) in staredRepos"
        :key="index"
      >
        <div class="flex-1 max-w-full p-20">
          <div class="p-0 m-0 text-size-20 font-bold flex items-center">
            <i class="i-ic-round-star text-yellow-500 mr-10 text-shadow-sm"></i>
            <a
              class="no-underline hover:underline text-#0969da"
              :href="repo.html_url"
              target="_blank"
            >
              <span class="font-normal">{{ repo.owner.login }} /</span>
              {{ repo.name }}
            </a>
          </div>

          <div class="my-10 text-#57606a leading-1.8em clipTxt">
            {{ repo.description }}
          </div>

          <div class="flex items-center mb-10">
            <template v-if="isEditing && currentRepo.id === repo.id">
              <a-select
                class="mr-10 max-w-500px"
                size="small"
                v-model="currentRepo._tags"
                placeholder="Please select ..."
                multiple
                :options="dataStore.tagNames"
                allow-create
                :ref="(el) => (currentInput[repo.id] = el)"
              >
              </a-select>

              <a-button
                size="small"
                shape="round"
                type="primary"
                class="mr-10"
                :loading="currentRepo.updating"
                @click="handleSaveTag(repo)"
              >
                保存
              </a-button>

              <a-button size="small" shape="round" @click="isEditing = false">
                取消
              </a-button>
            </template>

            <div
              class="flex items-center"
              v-show="!(isEditing && currentRepo.id === repo.id)"
            >
              <a-tag
                size="medium"
                v-for="(t, i) in repo._tags"
                :key="i"
                color="#0969da"
                class="mr-10"
              >
                {{ t }}
              </a-tag>
              <a-button
                shape="round"
                size="small"
                type="outline"
                @click="handleAddTag(repo)"
              >
                <template #icon>
                  <icon-tags v-if="repo._tags.length" />
                  <icon-tag v-else />
                </template>
                {{ repo._tags.length ? '编辑' : '添加' }}标签
              </a-button>
            </div>
          </div>

          <a-overflow-list style="width: 100%">
            <a-tag v-for="(t, i) in repo.topics" :key="i">
              {{ t }}
            </a-tag>
          </a-overflow-list>
        </div>

        <div
          class="group-hover:w-10% group-hover:min-w-100 flex-shrink-0"
        ></div>

        <div
          @click="emit('click', repo)"
          class="w-10% border-l border-l-gray-200 min-w-100 text-#0969da absolute h-full top-0 right-0 flex flex-col justify-center items-center group-hover:bg-blue-50 group-hover:translate-x-0 translate-x-full transition-all duration-200 cursor-pointer"
        >
          <i class="i-ic-baseline-chrome-reader-mode text-size-50"></i>
          README.md
        </div>
      </div>

      <a-back-top
        target-container=".list-wrap"
        :style="{
          position: 'absolute',
        }"
      >
      </a-back-top>
    </div>
  </div>
</template>

<script setup>
  import cloneDeep from 'lodash/cloneDeep';
  import difference from 'lodash/difference';
  import { v4 as uuidv4 } from 'uuid';

  import { useStarStore, useDataStore } from '@/store';

  const emit = defineEmits(['click']);
  const dataStore = useDataStore();

  const starStore = useStarStore();
  const keywords = ref('');
  const staredRepos = computed(() => {
    return starStore.tagedRepos.filter((i) => {
      return (
        i.full_name?.includes(keywords.value) ||
        i.descriptions?.includes(keywords.value)
      );
    });
  });

  // 标签编辑
  const currentRepo = ref({ _tags: [], updating: false });
  const isEditing = ref(false);
  const currentInput = ref({});
  async function handleAddTag(repo) {
    currentRepo.value = cloneDeep(repo);
    const tags = repo._tags || [];
    currentRepo.value._tags = [...tags];
    currentRepo.value._oldTags = [...tags];

    isEditing.value = true;
    // await nextTick();
    // currentInput.value[repo.id];
    // .focus();
    setTimeout(() => {
      const input =
        currentInput.value?.[repo.id].$el.nextElementSibling.querySelector(
          'input'
        );

      input && input.click();

      setTimeout(() => {
        input && input.focus();
      }, 60);
    }, 60);
  }

  function handleSaveTag() {
    const { _tags, _oldTags, id } = currentRepo.value;

    const addTags = difference(_tags, _oldTags);
    const removeTags = difference(_oldTags, _tags);
    const allTags = cloneDeep(dataStore.tags);

    // 标签无更改，直接返回
    if (!addTags.length && !removeTags.length) {
      isEditing.value = false;
      return;
    }

    if (addTags.length) {
      addTags.forEach((i) => {
        if (!dataStore.tagNames.includes(i)) {
          allTags.push({
            id: uuidv4(),
            name: i,
            repos: [id],
          });
        } else {
          const tag = allTags.find((t) => t.name === i);
          if (tag && !tag.repos.includes(id)) {
            tag.repos.push(id);
          }
        }
      });
    }

    if (removeTags.length) {
      removeTags.forEach((i) => {
        const tag = allTags.find((t) => t.name === i);
        if (tag && tag.repos.includes(id)) {
          tag.repos.splice(tag.repos.indexOf(id), 1);
        }
      });
    }

    currentRepo.value.updating = true;
    dataStore.updateTags(allTags).finally(() => {
      currentRepo.value.updating = false;
      isEditing.value = false;
    });
  }
</script>

<style lang="less">
  .arco-tag {
    height: 28px;
    line-height: 28px;
  }
</style>
