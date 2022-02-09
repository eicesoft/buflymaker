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
    <template :key="element.key" v-for="element in list">
      <template v-if="element.comp_type === ElementGroup.layout">
        <template v-if="element?.type === ElementTypes.grid">
          <n-grid :x-gap="20" :y-gap="20" :cols="element.columns.length">
            <n-gi :key="col_index" v-for="(column, col_index) in element.columns">
              <template :key="col_element.key" v-for="col_element in column.list">
                <GenerateFormItem
                  v-if="!col_element.hide"
                  @update="updateValue"
                  :item="col_element"
                />
              </template>
            </n-gi>
          </n-grid>
        </template>

        <template v-else-if="element?.type === ElementTypes.tab">
          <n-tabs type="line">
            <n-tab-pane
              :key="col_index"
              v-for="(column, col_index) in element.columns"
              :name="column.name"
              :tab="column.name"
            >
              <template :key="col_element.key" v-for="col_element in column.list">
                <GenerateFormItem
                  v-if="!col_element.hide"
                  @update="updateValue"
                  :item="col_element"
                />
              </template>
            </n-tab-pane> </n-tabs
        ></template>

        <template v-else-if="element?.type === ElementTypes.divider">
          <n-divider />
        </template>
      </template>

      <template v-else>
        <GenerateFormItem v-if="!element.hide" @update="updateValue" :item="element" />
      </template>
    </template>
  </n-form>
</template>

<script name="GenerateForm" setup lang="ts">
  import { PropType, ref } from 'vue';
  import { NForm, NGrid, NGi, NTabs, NTabPane } from 'naive-ui';
  import { ElementItem, ElementGroup, PageOptions, ElementTypes } from './';
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
    remoteMethod: {
      type: Array,
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
