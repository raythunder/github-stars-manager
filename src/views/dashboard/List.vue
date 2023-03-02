<template>
  <div class="flex flex-1 overflow-hidden">
    <div class="flex-1 p-10 overflow-auto">
      <div
        class="flex group p-10 py-20 border-b border-#d8dee4 hover:bg-gray-50 transition-all duration-200 relative overflow-hidden"
        v-for="(repo, index) in staredRepos"
        :key="index"
      >
        <div>
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
            <div v-if="isEditing && currentRepo.id === repo.id">
              <a-select
                style="width: 260px; max-width: 100%"
                class="mr-10"
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
            </div>

            <div v-show="!(isEditing && currentRepo.id === repo.id)">
              <a-tag
                bordered
                size="medium"
                v-for="(t, i) in repo._tags"
                :key="i"
                color="blue"
                class="mr-10"
              >
                {{ t }}
              </a-tag>
              <a-button size="small" type="outline" @click="handleAddTag(repo)">
                编辑标签
              </a-button>
            </div>
          </div>

          <a-space wrap>
            <a-tag v-for="(t, i) in repo.topics" :key="i">
              {{ t }}
            </a-tag>
          </a-space>
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
  const staredRepos = computed(() => {
    return starStore.tagedRepos;
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

<style lang=""></style>
