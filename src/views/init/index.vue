<template>
  <div class="min-h-100vh flex justify-center items-center">
    <div>
      <a-form
        ref="formRef"
        layout="vertical"
        class="px-5 mx-auto"
        :model="form"
      >
        <a-form-item
          field="token"
          label="AccessToken"
          :rules="[{ required: true, message: '请输入' }]"
        >
          <a-input v-model="form.token" style="width: 240px"></a-input>

          <template #help>
            get AccessToken from
            <a class="text-blue-500" href="https://github.com/settings/tokens">
              Here
            </a>
          </template>
        </a-form-item>
        <a-form-item>
          <a-button long type="primary" @click="handleSubmit">确定</a-button>
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
