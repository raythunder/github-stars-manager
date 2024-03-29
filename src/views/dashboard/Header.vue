<template>
  <div
    class="bg-#24292f text-white w-full left-0 top-0 flex p-10 justify-between items-center w-full shadow-md relative z-10"
  >
    <div class="flex items-center">
      <a :href="userInfo.html_url" target="_blank" class="text-white">
        <a-avatar :size="32" class="mr-10">
          <img alt="avatar" :src="userInfo.avatar_url" />
        </a-avatar>

        <span>{{ userInfo.login }}</span>
      </a>

      <div
        class="flex justify-center items-center text-yellow-400 ml-20"
        v-if="starData.loading"
      >
        <starLoading :loading="starData.loading" class="mr-10"></starLoading>
        <span>{{ $t('fetchingData') }}</span>
      </div>

      <div
        v-if="!starData.loading"
        class="flex items-center cursor-pointer"
        @click="starData.fetchStaredList(true)"
      >
        <i class="i-ic-baseline-sync ml-20"></i> {{ $t('syncLatest') }}
      </div>
    </div>

    <a-space size="large" class="custom-tag">
      <TagFilterMode></TagFilterMode>

      <a-radio-group v-model="filters.isUntaged" @change="handleChange">
        <a-radio :value="true">
          <template #radio="{ checked }">
            <a-tag color="blue" :checked="checked" checkable>
              {{ $t('untaged') }}
            </a-tag>
          </template>
        </a-radio>
        <a-radio :value="false">
          <template #radio="{ checked }">
            <a-tag color="blue" :checked="checked" checkable>
              {{ $t('all') }}
            </a-tag>
          </template>
        </a-radio>
      </a-radio-group>

      <div class="relative">
        <a-tooltip :content="$t('settings.language')">
          <a-button
            class="nav-btn"
            type="primary"
            :shape="'circle'"
            @click="setDropDownVisible"
          >
            <template #icon>
              <icon-language />
            </template>
          </a-button>
        </a-tooltip>
        <a-dropdown trigger="click" @select="changeLocale">
          <div ref="triggerBtn" class="trigger-btn"></div>
          <template #content>
            <a-doption
              v-for="item in locales"
              :key="item.value"
              :value="item.value"
            >
              <template #icon>
                <icon-check v-show="item.value === currentLocale" />
              </template>
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>
      </div>
    </a-space>
  </div>
</template>

<script setup>
  import starLoading from '@/components/starLoading.vue';
  import { useUserStore, useDataStore, useStarStore } from '@/store';
  import TagFilterMode from '@/components/tagFilterMode.vue';
  import useLocale from '@/hooks/locale';
  import { LOCALE_OPTIONS } from '@/locale';

  const userInfo = useUserStore();
  const dataStore = useDataStore();
  const starData = useStarStore();
  const filters = reactive({ mode: 'or', isUntaged: false });

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

  function handleChange(val) {
    dataStore.updateFilter('isUntaged', val);

    // 筛选未标记的收藏时，清空标签筛选
    if (val) {
      dataStore.updateFilter('tags', []);
    }
  }

  const locales = [...LOCALE_OPTIONS];

  const { changeLocale, currentLocale } = useLocale();
  const triggerBtn = ref();
  const setDropDownVisible = () => {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    triggerBtn.value.dispatchEvent(event);
  };
</script>

<style lang="less" scoped>
  :deep .arco-radio-group .arco-radio {
    margin-right: 5px;
  }

  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }
  .trigger-btn {
    margin-left: 14px;
  }
</style>
