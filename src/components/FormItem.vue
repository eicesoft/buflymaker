<template>
  <div
    :class="{
      'form-view': true,
      [data?.comp_type]: true,
    }"
  >
    <div :class="{ 'move-active': active, move: true, icon: true }">
      <n-icon size="20">
        <SvgIcon name="move" color="#fff" />
      </n-icon>
    </div>

    <div v-show="active" class="tool">
      <n-icon @click="copyItem" class="icon" size="20">
        <SvgIcon name="copy" color="#fff" />
      </n-icon>

      <n-icon @click="removeItem" class="icon" size="20">
        <SvgIcon name="delete" color="#fff" />
      </n-icon>
    </div>
    <div class="tips">{{ data?.key }}</div>

    <n-form-item
      v-if="data?.comp_type === ElementGroup.basic"
      @click.stop="clickItem"
      class="form-item"
      :class="{ active: active }"
      :label="data?.label"
      :path="data?.key"
      :required="data.options.required"
    >
      <template v-if="data?.type === ElementTypes.input || data?.type === ElementTypes.textarea">
        <n-input
          :type="data?.type === ElementTypes.input ? 'text' : 'textarea'"
          readonly
          v-model:value="data.options.defaultValue"
          :placeholder="data.options.placeholder"
          :clearable="data.options.clearable"
        />
      </template>

      <template v-if="data?.type === ElementTypes.number">
        <n-input-number
          disabled
          v-model:value="data.options.defaultValue"
          :placeholder="data.options.placeholder"
          :clearable="data.options.clearable"
          :min="data.options.min"
          :max="data.options.max"
        />
      </template>

      <template v-else-if="data?.type === ElementTypes.radio">
        <n-radio-group v-model:value="data.options.defaultValue">
          <n-radio
            :key="oIndex"
            v-for="(item, oIndex) in data.options.options"
            :value="item.value"
            :name="item.label"
          >
            {{ item.label }}
          </n-radio>
        </n-radio-group>
      </template>

      <template v-else-if="data?.type === ElementTypes.checkbox">
        <n-checkbox-group v-model:value="data.options.defaultValue">
          <n-space item-style="display: flex;">
            <n-checkbox
              :key="oIndex"
              v-for="(item, oIndex) in data.options.options"
              :value="item.value"
              :label="item.label"
            />
          </n-space>
        </n-checkbox-group>
      </template>

      <template v-else-if="data?.type === ElementTypes.select">
        <n-select
          readonly
          v-model:value="data.options.defaultValue"
          :options="data.options.options"
          :clearable="data.options.clearable"
        />
      </template>

      <template v-else-if="data?.type === ElementTypes.date">
        <n-date-picker
          disabled
          v-model:value="data.options.defaultValue"
          :placeholder="data.options.placeholder"
          type="date"
          :clearable="data.options.clearable"
        />
      </template>

      <template v-else-if="data?.type === ElementTypes.time">
        <n-time-picker
          disabled
          v-model:value="data.options.defaultValue"
          :placeholder="data.options.placeholder"
          :clearable="data.options.clearable"
        />
      </template>

      <template v-else-if="data?.type === ElementTypes.rate">
        <n-rate :count="data.options.max" v-model:value="data.options.defaultValue" />
      </template>

      <template v-else-if="data?.type === ElementTypes.slider">
        <n-slider
          :max="data.options.max"
          :min="data.options.min"
          v-model:value="data.options.defaultValue"
          range
          :step="1"
        />
      </template>

      <template v-else-if="data?.type === ElementTypes.switch">
        <n-switch v-model:value="data.options.defaultValue" />
      </template>
    </n-form-item>

    <div
      @click.stop="clickItem"
      v-else-if="data?.comp_type === ElementGroup.advance"
      class="form-item"
      :class="{ active: active }"
    >
      <template v-if="data?.type === ElementTypes.custom">
        <div class="custom">{{ data.label }}</div>
      </template>
    </div>
  </div>
</template>

<script name="FormItem" setup lang="ts">
  import { ElementItem, ElementTypes, ElementGroup } from './';
  import SvgIcon from './SvgIcon.vue';
  import { PropType } from 'vue';
  import {
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
    NIcon,
  } from 'naive-ui';

  const props = defineProps({
    data: {
      type: Object as PropType<ElementItem>,
    },
    active: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
    },
  });

  const emit = defineEmits(['change-item', 'remove', 'copy']);

  const clickItem = () => {
    emit('change-item', props.data);
  };

  const removeItem = () => {
    emit('remove', props.index);
  };

  const copyItem = () => {
    emit('copy', props.index, props.data);
  };
</script>

<style lang="scss" scoped>
  .form-view {
    margin: 2px;
    position: relative;
  }
</style>
