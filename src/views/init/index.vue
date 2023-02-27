<template>
  <div class="h-100vh flex justify-center items-center">
    <div>
      <a-form
        ref="formRef"
        auto-label-width
        class="px-5 mx-auto"
        layout="inline"
        :model="form"
      >
        <a-form-item
          field="token"
          label="AccessToken"
          :rules="[{ required: true, message: '请输入' }]"
        >
          <a-input v-model="form.token"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSubmit">确定</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
  import { ls } from '@/utils';
  import { useUserStore } from '@/store';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const form = ref({
    token: '',
  });

  const router = useRouter();

  const formRef = ref();
  async function handleSubmit() {
    const err = await formRef.value?.validate();
    if (err) return;

    ls.set('token', form.value.token);
    userStore.init(form.value.token);
    router.push('/dashboard');
  }
</script>

<style lang=""></style>
