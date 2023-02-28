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
          class="group hover:pr-12% p-10 py-20 border-b border-#d8dee4 hover:bg-#f3f4f6 transition-all duration-200 relative overflow-hidden"
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
            class="py-20 text-#57606a leading-1.8em h-76 overflow-hidden"
            style="
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            "
          >
            {{ repo.description }}
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
  </div>
</template>

<script setup>
  import Readme from './Readme.vue';
  import { useStarStore, useUserStore } from '@/store';

  const userInfo = useUserStore();

  const starStore = useStarStore();
  const staredRepos = computed(() => {
    return starStore.staredRepos;
  });

  const readme = ref();
  async function handleClick(repo) {
    readme.value.show(repo);
  }
</script>

<style lang=""></style>
