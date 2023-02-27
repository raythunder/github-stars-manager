import { Message } from '@arco-design/web-vue';
import { cloneDeep } from 'lodash';

export default ({
  emit,
  add,
  update,
  defaultForm,
  initCallback,
  beforeSubmit,
}) => {
  const visible = ref(false);
  const editType = ref('add');

  const defaultData = () => defaultForm;

  const form = ref(defaultData());
  const show = async (data, options) => {
    editType.value = data ? 'edit' : 'add';
    visible.value = true;

    const initData = data ? cloneDeep(data) : defaultData();
    form.value = initCallback
      ? await initCallback(initData, options)
      : initData;
  };

  const hide = () => {
    visible.value = false;
    formRef.value?.resetFields();
  };

  const formRef = ref(null);
  const handleSubmit = async (done) => {
    try {
      const res = await formRef.value?.validate();

      if (res) return done(false);

      const action = editType.value === 'add' ? add : update;

      if (!action) {
        return done(true);
      }

      const params = beforeSubmit
        ? await beforeSubmit(cloneDeep(form.value))
        : cloneDeep(form.value);

      return action(params)
        .then(() => {
          done(true);
          hide();

          Message.success('操作成功');

          emit('update');
        })
        .catch(() => {
          done(false);
        });
    } catch (e) {
      console.log(
        '%c [ e ]-57',
        'font-size:13px; background:pink; color:#bf2c9f;',
        e
      );
    }
  };

  return {
    visible,
    editType,
    form,
    show,
    hide,
    formRef,
    handleSubmit,
  };
};
