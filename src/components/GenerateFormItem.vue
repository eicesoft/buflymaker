<template>
  <n-form-item
    v-if="data?.comp_type === ElementGroup.basic"
    class="form-item"
    :label="data?.label"
    :path="data?.key"
    :required="data.options.required"
  >
    <template v-if="data?.type === ElementTypes.input || data?.type === ElementTypes.textarea">
      <n-input
        :type="data?.type === ElementTypes.input ? 'text' : 'textarea'"
        v-model:value="val"
        :placeholder="data.options.placeholder"
        clearable
      />
    </template>

    <template v-else-if="data?.type === ElementTypes.radio">
      <n-radio-group v-model:value="val">
        <n-radio
          :key="index"
          v-for="(item, index) in data.options.options"
          :value="item.value"
          :name="item.label"
        >
          {{ item.label }}
        </n-radio>
      </n-radio-group>
    </template>

    <template v-else-if="data?.type === ElementTypes.checkbox">
      <n-checkbox-group v-model:value="val">
        <n-space item-style="display: flex;">
          <n-checkbox
            :key="index"
            v-for="(item, index) in data.options.options"
            :value="item.value"
            :label="item.label"
          />
        </n-space>
      </n-checkbox-group>
    </template>

    <template v-else-if="data?.type === ElementTypes.select">
      <n-select v-model:value="val" :options="data.options.options" clearable />
    </template>

    <template v-else-if="data?.type === ElementTypes.date">
      <n-date-picker
        v-model:value="val"
        :placeholder="data.options.placeholder"
        type="date"
        clearable
      />
    </template>

    <template v-else-if="data?.type === ElementTypes.time">
      <n-time-picker
        v-model:formatted-value="val"
        value-format="HH:mm:ss"
        :placeholder="data.options.placeholder"
        clearable
      />
    </template>

    <template v-else-if="data?.type === ElementTypes.rate">
      <n-rate :count="data.options.max" v-model:value="val" />
    </template>

    <template v-else-if="data?.type === ElementTypes.slider">
      <n-slider
        :max="data.options.max"
        :min="data.options.min"
        v-model:value="val"
        range
        :step="1"
      />
    </template>

    <template v-else-if="data?.type === ElementTypes.switch">
      <n-switch v-model:value="val" />
    </template>
  </n-form-item>

  <div v-if="data?.comp_type === ElementGroup.layout">
    <template v-if="data?.type === ElementTypes.grid">
      <n-grid x-gap="1" :cols="data.columns.length">
        <n-gi :key="col_index" v-for="(column, col_index) in data.columns">
          <GenerateForm @change="childChange" :list="column.list" />
        </n-gi>
      </n-grid>
    </template>

    <template v-else-if="data?.type === ElementTypes.tab">
      <n-tabs type="line">
        <n-tab-pane
          :name="column.name"
          :tab="column.name"
          :key="col_index"
          v-for="(column, col_index) in data.columns"
        >
          <GenerateForm @change="childChange" :list="column.list" />
        </n-tab-pane>
      </n-tabs>
    </template>

    <template v-else-if="data?.type === ElementTypes.divider">
      <n-divider />
    </template>
  </div>
</template>
<script setup lang="ts">
  import GenerateForm from './GenerateForm.vue';

  import { ElementItem, ElementTypes, ElementGroup } from './';
  import {PropType, ref, watch} from 'vue';

  const props = defineProps({
    data: {
      type: Object as PropType<ElementItem>,
    },
  });

  const val = ref(props.data?.options.defaultValue);

  const emit = defineEmits(['update']);
  watch(val, (newval) => {
    emit('update', newval, props.data);
  });

  const childChange = (childVal, item) => {
    emit('update', childVal, item);
  };
</script>
