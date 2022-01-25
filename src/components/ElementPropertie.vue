/* eslint-disable vue/no-mutating-props */
<template>
  <n-tabs size="small" type="line">
    <n-tab-pane name="field" tab="字段属性">
      <n-form
        v-if="compOptions != null"
        label-width="auto"
        :model="formValue"
        :size="'small'"
        ref="formRef"
      >
        <n-form-item label="Key:" path="key">
          <n-input v-model:value="compOptions.key"/>
        </n-form-item>

        <n-form-item
          v-if="compOptions.comp_type !== ElementGroup.layout"
          label="标签:"
          path="label"
        >
          <n-input v-model:value="compOptions.label"/>
        </n-form-item>

        <n-form-item
          v-if="compOptions.comp_type === ElementGroup.basic"
          label="Placeholder:"
          path="placeholder"
        >
          <n-input v-model:value="compOptions.options.placeholder"/>
        </n-form-item>

        <!--默认值相关处理-->
        <n-form-item v-if="isEditType" label="默认值:" path="default_value">
          <n-input v-model:value="compOptions.options.defaultValue"/>
        </n-form-item>

        <n-form-item
          v-if="compOptions.comp_type === ElementGroup.basic"
          label="必填:"
          path="required"
        >
          <n-switch v-model:value="compOptions.options.required"/>
        </n-form-item>

        <n-form-item v-if="compOptions.type === ElementTypes.slider" label="最小值:" path="min">
          <n-input-number :min="0" v-model:value="compOptions.options.min"/>
        </n-form-item>

        <n-form-item
          v-if="compOptions.type === ElementTypes.rate || compOptions.type === ElementTypes.slider"
          label="最大值:"
          path="max"
        >
          <n-input-number
            :max="compOptions.type === ElementTypes.rate ? 10 : 500"
            :min="compOptions.type === ElementTypes.rate ? 3 : 0"
            v-model:value="compOptions.options.max"
          />
        </n-form-item>

        <n-form-item v-if="compOptions.type === ElementTypes.grid" label="列数量:" path="column">
          <n-input-number :min="2" :max="5" v-model:value="columnLength"/>
        </n-form-item>

        <n-form-item v-if="compOptions.type === ElementTypes.tab" label="标签编辑:" path="tab">
          <div style="display: block; width: 100%">
            <draggable
              handle=".move"
              v-model="compOptions.columns"
              tag="transition-group"
              item-key="label"
              :sort="true"
            >
              <template #item="{ element, index }">
                <div class="column-flex">
                  <n-icon class="move" size="24">
                    <BarsOutlined/>
                  </n-icon>
                  <n-input v-model:value="element.name"/>
                  <n-icon size="24" @click="removeColumn(index)">
                    <DeleteOutlined/>
                  </n-icon>
                </div>
              </template>
            </draggable>
            <n-button block ghost strong @click="addColumn">添加</n-button>
          </div>
        </n-form-item>

        <n-form-item
          v-if="
            compOptions?.type === ElementTypes.radio ||
            compOptions?.type === ElementTypes.select ||
            compOptions?.type === ElementTypes.checkbox
          "
          label="选项:"
          path="items"
        >
          <OptionEdit v-model:options="compOptions.options.options"/>
        </n-form-item>
      </n-form>
    </n-tab-pane>

    <n-tab-pane name="form" tab="表单属性">
      <n-form
        v-if="pageOption != null"
        label-width="auto"
        :model="formValue"
        :size="'small'"
        ref="formRef"
      >
        <n-form-item label="表单大小">
          <n-select v-model:value="pageOption.size" :options="sizeOptions"/>
        </n-form-item>

        <n-form-item label="文本对齐方式">
          <n-select v-model:value="pageOption.align" :options="alignOptions"/>
        </n-form-item>

        <n-form-item label="标签显示位置">
          <n-select v-model:value="pageOption.position" :options="placementOptions"/>
        </n-form-item>

        <n-form-item label="标签的宽度">
          <n-input v-model:value="pageOption.labelWidth"/>
        </n-form-item>
      </n-form>
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import {ref, watch, PropType, computed} from 'vue';
import OptionEdit from './OptionEdit.vue';
import {DeleteOutlined, BarsOutlined} from '@vicons/antd';
import {ElementItem, ElementTypes, PageOptions, ElementGroup} from './';
import draggable from 'vuedraggable';

const formRef = ref(null);
const formValue = ref({});

const props = defineProps({
  select: {
    type: Object as PropType<ElementItem>,
    require: true,
  },
  pageOption: {
    type: Object as PropType<PageOptions>,
    require: true,
  },
});

const sizeOptions = [
  {
    label: 'Small',
    value: 'small',
  },
  {
    label: 'Medium',
    value: 'medium',
  },
  {
    label: 'Large',
    value: 'large',
  },
];

const placementOptions = [
  {
    label: 'Left',
    value: 'left',
  },
  {
    label: 'Top',
    value: 'top',
  },
];

const alignOptions = [
  {
    label: 'Left',
    value: 'left',
  },
  {
    label: 'Right',
    value: 'right',
  },
];

const compOptions = ref(props.select);

const addColumn = () => {
  compOptions.value?.columns?.push({
    name: 'tab' + (compOptions.value?.columns.length + 1),
    list: [],
  });
};

const removeColumn = (index) => {
  compOptions.value?.columns?.splice(index, 1);
};

// console.log(compOptions.value);
const isEditType = computed(() => {
  return (
    compOptions.value?.type === ElementTypes.input ||
    compOptions.value?.type === ElementTypes.textarea
  );
});

const columnLength = ref();

watch(columnLength, (length) => {
  console.log('columnLength change', length, compOptions.value?.columns?.length);
  const objLength = compOptions.value?.columns?.length || null;
  if (objLength != null) {
    if (length > objLength) {
      compOptions.value?.columns?.push({
        list: [],
      });
    } else if (length < objLength) {
      compOptions.value.columns.length--;
    }
  }
});

watch(
  () => props.select,
  (select: any) => {
    // console.log('ele change', select);
    compOptions.value = select;
    columnLength.value = select.columns?.length;
  }
);

const emit = defineEmits(['update:pageOption']);
watch(
  () => props.pageOption,
  (pageOption: any) => {
    // console.log('ele change', select);
    emit('update:pageOption', pageOption);
  }
);
</script>

<style lang="scss" scoped>
.column-flex {
  display: flex;
  margin: 2px 0;
}
</style>
