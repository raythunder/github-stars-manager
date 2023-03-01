<template>
  <a-modal
    :title="title"
    v-model:visible="visible"
    @cancel="hide"
    @before-ok="handleSubmit"
    unmount-on-close
  >
    <a-form
      ref="formRef"
      auto-label-width
      class="max-w-[80%] px-5 mx-auto"
      layout="horizontal"
      :model="form"
    >
      <a-form-item
        field="name"
        label="名称"
        :rules="[{ required: true, message: '请输入' }]"
      >
        <a-input v-model="form.name"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
  import useModal from '@/hooks/useModal';

  const emit = defineEmits(['update']);

  const title = computed(() => {
    return (editType.value === 'add' ? '新增' : '编辑') + '标签';
  });

  const { visible, editType, form, show, hide, formRef, handleSubmit } =
    useModal({
      emit,
      //   add: api.addItem,
      //   update: api.updateItem,
      defaultForm: {
        name: '',
        seq: '',
        description: '',
      },
    });

  defineExpose({
    show,
  });
</script>
