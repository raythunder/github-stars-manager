<template>
  <div>
    <div class="flex p-10 items-center w-full shadow-md">
      <a :href="userInfo.html_url" target="_blank" class="text-blue-500">
        <a-avatar class="mr-10">
          <img alt="avatar" :src="userInfo.avatar_url" />
        </a-avatar>

        <span>{{ userInfo.login }}</span>
      </a>
    </div>

    <div>{{ userInfo }}</div>
  </div>
</template>

<script setup>
  import { useUserStore } from '@/store';
  import { getUser } from '@/api/user';

  const userStore = useUserStore();
  const octokit = computed(() => {
    return userStore.octokit;
  });

  watch(
    octokit,
    (val) => {
      if (!val) return;
      console.log('octokit is exist');
    },
    { immediate: true }
  );

  const userInfo = ref({});
  getUser().then((res) => {
    console.log(res);
    userInfo.value = res.data;
  });
</script>

<style lang=""></style>
