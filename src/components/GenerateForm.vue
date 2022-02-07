<template>
  <n-form
    aria-readonly="true"
    :model="formModel"
    :label-placement="option.position"
    :label-align="option.align"
    :label-width="option.labelWidth"
    :size="option.size"
    ref="formRef"
  >
    <template :key="item.key" v-for="item in list">
      <GenerateFormItem v-if="!item.hide" @update="updateValue" :item="item" />
    </template>
  </n-form>
</template>

<script name="GenerateForm" setup lang="ts">
  import { NForm } from 'naive-ui';

  import { PropType, ref } from 'vue';
  import { ElementItem, PageOptions } from './';
  import GenerateFormItem from './GenerateFormItem.vue';

  defineProps({
    option: {
      type: Object as PropType<PageOptions>,
      default: () => {
        return {
          size: 'small',
          position: 'left',
          labelWidth: '100px',
        };
      },
    },
    list: {
      type: Array as PropType<ElementItem[]>,
      default() {
        return [];
      },
    },
  });

  const emit = defineEmits(['change']);
  //表单值
  let formModel = ref({});

  const updateValue = (val: any, item: ElementItem) => {
    formModel.value[item.key] = val;

    emit('change', val, item);
  };

  const GetValue = () => {
    return formModel.value;
  };

  defineExpose({
    GetValue,
  });
</script>
