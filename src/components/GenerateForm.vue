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
    <GenerateFormItem @update="updateValue" :data="item" :key="item.key" v-for="item in list" />
  </n-form>
</template>

<script setup lang="ts">
import {PropType, ref} from 'vue';
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
  const formModel = ref({});

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
