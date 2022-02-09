<template>
  <n-form-item
    v-if="item?.comp_type === ElementGroup.basic"
    class="form-item"
    :label="item?.label"
    :path="item?.key"
    :required="item.options.required"
  >
    <template v-if="item?.type === ElementTypes.input || item?.type === ElementTypes.textarea">
      <n-input
        :type="item?.type === ElementTypes.input ? 'text' : 'textarea'"
        v-model:value="val"
        :placeholder="item.options.placeholder"
        :clearable="item.options.clearable"
      />
    </template>

    <template v-if="item?.type === ElementTypes.number">
      <n-input-number
        v-model:value="val"
        :placeholder="item.options.placeholder"
        :clearable="item.options.clearable"
        :min="item.options.min"
        :max="item.options.max"
        :step="item.options.step"
      />
    </template>

    <template v-else-if="item?.type === ElementTypes.radio">
      <n-radio-group v-model:value="val">
        <n-radio
          :key="index"
          v-for="(item, index) in item.options.options"
          :value="item.value"
          :name="item.label"
        >
          {{ item.label }}
        </n-radio>
      </n-radio-group>
    </template>

    <template v-else-if="item?.type === ElementTypes.checkbox">
      <n-checkbox-group v-model:value="val">
        <n-space item-style="display: flex;">
          <n-checkbox
            :key="index"
            v-for="(item, index) in item.options.options"
            :value="item.value"
            :label="item.label"
          />
        </n-space>
      </n-checkbox-group>
    </template>

    <template v-else-if="item?.type === ElementTypes.select">
      <n-select
        v-model:value="val"
        :options="item.options.options"
        :clearable="item.options.clearable"
      />
    </template>

    <template v-else-if="item?.type === ElementTypes.date">
      <n-date-picker
        v-model:value="val"
        :placeholder="item.options.placeholder"
        type="date"
        :clearable="item.options.clearable"
      />
    </template>

    <template v-else-if="item?.type === ElementTypes.time">
      <n-time-picker
        v-model:formatted-value="val"
        value-format="HH:mm:ss"
        :placeholder="item.options.placeholder"
        :clearable="item.options.clearable"
      />
    </template>

    <template v-else-if="item?.type === ElementTypes.rate">
      <n-rate :count="item.options.max" v-model:value="val" />
    </template>

    <template v-else-if="item?.type === ElementTypes.slider">
      <n-slider
        :max="item.options.max"
        :min="item.options.min"
        v-model:value="val"
        range
        :step="1"
      />
    </template>

    <template v-else-if="item?.type === ElementTypes.switch">
      <n-switch v-model:value="val" />
    </template>

    <template v-else-if="item?.type === ElementTypes.color">
      <n-color-picker v-model:value="val" />
    </template>
  </n-form-item>
</template>
<script name="GenerateFormItem" setup lang="ts">
  import GenerateForm from './GenerateForm.vue';
  import {
    NGi,
    NGrid,
    NFormItem,
    NSwitch,
    NSlider,
    NInput,
    NInputNumber,
    NRate,
    NRadio,
    NRadioGroup,
    NTimePicker,
    NDatePicker,
    NSpace,
    NSelect,
    NCheckbox,
    NCheckboxGroup,
    NTabs,
    NTabPane,
    NColorPicker,
  } from 'naive-ui';
  import { ElementItem, ElementTypes, ElementGroup } from './';
  import { PropType, ref, watch } from 'vue';

  const props = defineProps({
    item: {
      type: Object as PropType<ElementItem>,
    },
  });

  const val = ref(props.item?.options.defaultValue);

  const emit = defineEmits(['update']);
  watch(
    val,
    (newval) => {
      emit('update', newval, props.item);
    },
    {
      immediate: true,
      deep: true,
    }
  );

  const childChange = (childVal, item) => {
    emit('update', childVal, item);
  };
</script>
