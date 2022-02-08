/* eslint-disable vue/no-mutating-props */
<template>
  <div class="propertie">
    <n-tabs size="small" type="line">
      <n-tab-pane name="field" tab="字段属性">
        <n-form
          v-if="compOptions != undefined"
          label-width="auto"
          :model="formValue"
          :size="'small'"
          ref="formRef"
        >
          <n-form-item required label="Key:" path="key">
            <n-input required v-model:value="compOptions.key" placeholder="请输入Key" />
          </n-form-item>

          <n-form-item
            required
            v-if="compOptions.comp_type !== ElementGroup.layout"
            label="标签:"
            path="label"
          >
            <n-input v-model:value="compOptions.label" placeholder="请输入标签" />
          </n-form-item>

          <n-form-item
            v-if="compOptions.comp_type === ElementGroup.basic"
            label="占位内容:"
            path="placeholder"
          >
            <n-input v-model:value="compOptions.options.placeholder" placeholder="请输入占位内容" />
          </n-form-item>

          <!--默认值相关处理-->
          <n-form-item v-if="isEditType" label="默认值:" path="default_value">
            <n-input v-model:value="compOptions.options.defaultValue" placeholder="请输入默认值" />
          </n-form-item>

          <n-form-item label="隐藏:" path="hide">
            <n-switch v-model:value="compOptions.hide" />
          </n-form-item>

          <n-form-item
            v-if="compOptions.comp_type === ElementGroup.basic"
            label="必填:"
            path="required"
          >
            <n-switch v-model:value="compOptions.options.required" />
          </n-form-item>

          <n-form-item v-if="isClearable" label="可清除:" path="clearable">
            <n-switch v-model:value="compOptions.options.clearable" />
          </n-form-item>

          <n-form-item
            v-if="
              compOptions.type === ElementTypes.slider || compOptions.type === ElementTypes.number
            "
            label="最小值:"
            path="min"
          >
            <n-input-number :min="0" v-model:value="compOptions.options.min" />
          </n-form-item>

          <n-form-item
            v-if="
              compOptions.type === ElementTypes.rate ||
              compOptions.type === ElementTypes.slider ||
              compOptions.type === ElementTypes.number
            "
            label="最大值:"
            path="max"
          >
            <n-input-number
              :max="compOptions.type === ElementTypes.rate ? 10 : 500"
              :min="compOptions.type === ElementTypes.rate ? 3 : 0"
              v-model:value="compOptions.options.max"
            />
          </n-form-item>

          <n-form-item v-if="compOptions.type === ElementTypes.number" label="步长:" path="step">
            <n-input-number
              :min="1"
              :max="compOptions.options.max"
              v-model:value="compOptions.options.step"
            />
          </n-form-item>

          <n-form-item v-if="compOptions.type === ElementTypes.grid" label="列数量:" path="column">
            <n-input-number :min="2" :max="5" v-model:value="columnLength" />
          </n-form-item>

          <n-form-item v-if="compOptions.type === ElementTypes.tab" label="标签编辑:" path="tab">
            <div style="display: block; width: 100%">
              <draggable
                handle=".move"
                v-model="compOptions.columns"
                tag="transition-group"
                item-key="name"
                :sort="true"
              >
                <template #item="{ element, index }">
                  <div class="column-flex">
                    <n-icon class="move" size="20">
                      <SvgIcon name="bars" color="#333333" />
                    </n-icon>
                    <n-input v-model:value="element.name" />
                    <n-icon size="20" @click="removeColumn(index)">
                      <SvgIcon name="delete" color="#333333" />
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
            <OptionEdit v-model:options="compOptions.options.options" />
          </n-form-item>
        </n-form>

        <div v-else> 请选择元素 </div>
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
            <n-select v-model:value="pageOption.size" :options="sizeOptions" />
          </n-form-item>

          <n-form-item label="文本对齐方式">
            <n-select v-model:value="pageOption.align" :options="alignOptions" />
          </n-form-item>

          <n-form-item label="标签显示位置">
            <n-select v-model:value="pageOption.position" :options="placementOptions" />
          </n-form-item>

          <n-form-item label="标签的宽度">
            <n-input v-model:value="pageOption.labelWidth" />
          </n-form-item>
        </n-form>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script name="ElementPropertie" setup lang="ts">
  import { ref, watch, PropType, computed } from 'vue';
  import OptionEdit from './OptionEdit.vue';
  import SvgIcon from './SvgIcon.vue';

  import { ElementItem, ElementTypes, PageOptions, ElementGroup } from './';
  import {
    NTabs,
    NTabPane,
    NForm,
    NFormItem,
    NInput,
    NSelect,
    NInputNumber,
    NIcon,
    NSwitch,
    NButton,
  } from 'naive-ui';
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

  const removeColumn = (index: number) => {
    compOptions.value?.columns?.splice(index, 1);
  };

  // console.log(compOptions.value);
  const isEditType = computed(() => {
    return (
      compOptions.value?.type === ElementTypes.input ||
      compOptions.value?.type === ElementTypes.textarea
    );
  });

  const isClearable = computed(() => {
    return (
      compOptions.value?.type === ElementTypes.input ||
      compOptions.value?.type === ElementTypes.textarea ||
      compOptions.value?.type === ElementTypes.select ||
      compOptions.value?.type === ElementTypes.date ||
      compOptions.value?.type === ElementTypes.time
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
      if (select !== undefined) {
        columnLength.value = select.columns?.length;
      }
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
  .propertie {
    user-select: none;
    border-left: 1px solid #ececec;
    height: 100%;
    padding: 8px;
    .column-flex {
      display: flex;
      margin: 2px 0;
    }
  }
</style>
