<template>
  <a-config-provider :locale="locale">
    <router-view />
    <global-setting />
  </a-config-provider>
</template>

<script setup>
  import { computed } from 'vue';
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import GlobalSetting from '@/components/global-setting/index.vue';
  import useLocale from '@/hooks/locale';
  import { ls } from '@/utils';
  import { useUserStore } from '@/store';
  import { useRouter } from 'vue-router';

  const { currentLocale } = useLocale();
  const locale = computed(() => {
    switch (currentLocale.value) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return enUS;
    }
  });

  const userStore = useUserStore();
  const router = useRouter();
  if (ls.get('token')) {
    userStore.init(ls.get('token'));
    router.push('/dashboard');
  }
</script>

<style lang="less">
  html,
  body {
    padding: 0;
    margin: 0;
  }
  @blue: #0969da;

  .custom-tag {
    .arco-tag {
      color: white;
    }
    .arco-tag:hover {
      color: black;
    }

    .arco-tag-checked:hover {
      color: rgb(var(--blue-6));
    }

    .arco-tag.arco-tag-checked.arco-tag-blue {
      background-color: @blue;
      color: #fff;
    }

    .arco-tag.arco-tag-checkable.arco-tag-checked.arco-tag-blue.arco-tag:hover {
      background-color: @blue;
    }
  }
</style>
