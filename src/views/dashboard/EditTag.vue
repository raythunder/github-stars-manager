<template>
  <a-modal
    :title="title"
    v-model:visible="visible"
    @cancel="hide"
    @before-ok="handleSubmit"
    unmount-on-close
    width="80%"
  >
    <draggable
      v-model="editData"
      group="people"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
    >
      <template #item="{ element: tag }">
        <span class="p-5 inline-block border-1 border-transparent">
          <a-input
            v-if="tag.isEditing"
            :ref="(el) => (inputRef[tag.id] = el)"
            @blur="handelBlur(tag)"
            v-model="tag.name"
            style="
              height: 28px;
              display: inline-block;
              width: auto;
              vertical-align: middle;
            "
          ></a-input>

          <a-tag v-else color="blue" size="large" @dblclick="handleClick(tag)">
            {{ tag.name }}
          </a-tag>
        </span>
      </template>
    </draggable>
  </a-modal>
</template>

<script setup>
  import draggable from 'vuedraggable';
  import useModal from '@/hooks/useModal';
  import { useDataStore } from '@/store';
  import cloneDeep from 'lodash/cloneDeep';

  const dataStore = useDataStore();
  const editData = ref([]);
  const drag = ref(false);

  watch(
    () => dataStore.tags,
    (val) => {
      editData.value = cloneDeep(val);
    },
    {
      immediate: true,
    }
  );

  const emit = defineEmits(['update']);

  const title = computed(() => {
    return '编辑标签';
  });

  const { visible, editType, form, show, hide, formRef, handleSubmit } =
    useModal({
      emit,
      add: () => dataStore.updateTags(editData.value),
      defaultForm: {
        name: '',
        seq: '',
        description: '',
      },
    });

  const inputRef = ref({});
  function handleClick(item) {
    item.isEditing = true;

    nextTick(() => {
      inputRef.value[item.id].focus();
    });
  }

  function handelBlur(tag) {
    delete tag.isEditing;
  }
  defineExpose({
    show,
  });
</script>

<style lang="less">
  .sortable-ghost {
    // opacity: 0.5;
    border: 1px dashed #165dff;
  }
</style>
