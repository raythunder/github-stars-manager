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

    <div>{{ dataStore }}</div>
  </div>
</template>

<script setup>
  import { getUser } from '@/api/user';
  import { useDataStore } from '@/store';

  const userInfo = ref({});
  getUser().then((res) => {
    userInfo.value = res.data;
  });

  const dataStore = useDataStore();
</script>

<style lang=""></style>
