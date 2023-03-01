<template>
  <div class="flex flex-col h-100vh overflow-hidden">
    <div class="w-full left-0 top-0 flex p-10 items-center w-full shadow-md">
      <a :href="userInfo.html_url" target="_blank" class="text-blue-500">
        <a-avatar class="mr-10">
          <img alt="avatar" :src="userInfo.avatar_url" />
        </a-avatar>

        <span>{{ userInfo.login }}</span>
      </a>
    </div>

    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 p-10 overflow-auto">
        <div
          class="group hover:pr-12% p-10 py-20 border-b border-#d8dee4 hover:bg-gray-50 transition-all duration-200 relative overflow-hidden"
          v-for="(repo, index) in staredRepos"
          :key="index"
        >
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

          <div
            class="clipTxt py-20 text-#57606a leading-1.8em h-76 overflow-hidden"
          >
            {{ repo.description }}
          </div>

          <div class="flex items-center mb-10">
            <template v-if="isEditing && currentRepo.id === repo.id">
              <a-select
                style="width: 500px; max-width: 100%"
                class="mr-10"
                size="small"
                v-model="currentRepo._tags"
                placeholder="Please select ..."
                multiple
                :options="dataStore.tagNames"
                allow-create
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

            <template v-else>
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
                size="small"
                shape="round"
                type="outline"
                @click="handleAddTag(repo)"
              >
                编辑标签
              </a-button>
            </template>
          </div>

          <a-space wrap>
            <a-tag v-for="(t, i) in repo.topics" :key="i">
              {{ t }}
            </a-tag>
          </a-space>

          <div
            @click="handleClick(repo)"
            class="w-10% absolute h-full top-0 right-0 flex justify-center items-center group-hover:bg-blue-100 group-hover:translate-x-0 translate-x-full transition-all duration-200 cursor-pointer"
          >
            <i class="i-ic-round-read-more text-size-50 text-blue-500"></i>
          </div>
        </div>
      </div>
    </div>

    <Readme ref="readme"></Readme>

    <TagModal ref="tagModal"></TagModal>
  </div>
</template>

<script setup>
  import Readme from './Readme.vue';
  import TagModal from './TagModal.vue';
  import cloneDeep from 'lodash/cloneDeep';
  import difference from 'lodash/difference';
  import { useStarStore, useUserStore, useDataStore } from '@/store';
  import { v4 as uuidv4 } from 'uuid';

  const userInfo = useUserStore();
  const dataStore = useDataStore();

  const starStore = useStarStore();
  const staredRepos = computed(() => {
    return starStore.tagedRepos;
  });

  const readme = ref();
  async function handleClick(repo) {
    readme.value.show(repo);
  }

  // 标签编辑
  const tagModal = ref();
  const currentRepo = ref({ _tags: [], updating: false });
  const isEditing = ref(false);

  async function handleAddTag(repo) {
    currentRepo.value = cloneDeep(repo);
    const tags = repo._tags || [];
    currentRepo.value._tags = [...tags];
    currentRepo.value._oldTags = [...tags];

    isEditing.value = true;
    // await nextTick();
    // currentInput.value[repo.id];
    // .focus();
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
  .clipTxt {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
