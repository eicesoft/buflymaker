<template>
  <div
    :class="{
      'form-view': true,
      [data?.comp_type]: true,
    }"
  >
    <div :class="{ 'move-active': active, move: true, icon: true }">
      <n-icon size="22">
        <DragOutlined />
      </n-icon>
    </div>

    <div v-show="active" class="tool">
      <n-icon @click="copyItem" class="icon" size="22">
        <CopyOutlined />
      </n-icon>

      <n-icon @click="removeItem" class="icon" size="22">
        <DeleteOutlined />
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
          clearable
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
          clearable
        />
      </template>

      <template v-else-if="data?.type === ElementTypes.date">
        <n-date-picker
          disabled
          v-model:value="data.options.defaultValue"
          :placeholder="data.options.placeholder"
          type="date"
          clearable
        />
      </template>

      <template v-else-if="data?.type === ElementTypes.time">
        <n-time-picker
          disabled
          v-model:value="data.options.defaultValue"
          :placeholder="data.options.placeholder"
          clearable
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

    <div
      @click.stop="clickItem"
      v-else-if="data?.comp_type === ElementGroup.layout"
      class="form-item"
      :class="{ active: active }"
    >
      <template v-if="data?.type === ElementTypes.grid">
        <n-grid x-gap="1" :cols="data.columns.length">
          <n-gi
            style="border: 1px dashed #ececec"
            :key="col_index"
            v-for="(column, col_index) in data.columns"
          >
            <FormView v-model:list="column.list" @select-item="changeItem" />
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
            <FormView v-model:list="column.list" @select-item="changeItem" />
          </n-tab-pane>
        </n-tabs>
      </template>

      <template v-else-if="data?.type === ElementTypes.divider">
        <n-divider />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ElementItem, ElementTypes, ElementGroup } from './';
  import { DragOutlined, DeleteOutlined, CopyOutlined } from '@vicons/antd';
  import FormView from './FormView.vue';
  import { PropType } from 'vue';

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

  const changeItem = (item) => {
    emit('change-item', item);
  };

  const removeItem = () => {
    emit('remove', props.index);
  };

  const copyItem = () => {
    emit('copy', props.index, props.data);
  };
</script>

<style lang="scss" scoped>
  $border-size: 2px;
  $basic-active-border-color: #ff8282;
  $basic-active-background-color: hsl(0, 50%, 98%);
  $basic-border-color: #cccccc;

  $advance-active-border-color: #526bf5;
  $advance-active-background-color: hsl(240, 45%, 98%);
  $advance-border-color: #cccccc;

  $layout-active-border-color: #ffcb7c;
  $layout-active-background-color: hsl(36, 45%, 98%);
  $layout-border-color: #cccccc;

  $key-color: rgb(170, 170, 169);
  .form-view {
    position: relative;
    width: 100%;
    margin: 0 0 2px 0;

    .icon {
      width: 22px;
      height: 22px;
    }
    .tool {
      height: 22px;
    }
    .form-item {
      padding: 10px;

      .custom {
        background-color: #cccccc;
        padding: 6px;
      }
    }
    .basic {
      .move-active {
        background-color: $basic-active-border-color;
      }
      .tool {
        background-color: $basic-active-border-color;
      }
      .form-item {
        border: $border-size dashed $basic-border-color;
        &:hover {
          border: $border-size solid $basic-active-border-color;
          background-color: $basic-active-background-color;
        }
      }
      .active {
        border: $border-size solid $basic-active-border-color;
        background-color: $basic-active-background-color;
      }
    }

    .advance {
      .move-active {
        background-color: $advance-active-border-color;
      }
      .tool {
        background-color: $advance-active-border-color;
      }
      .form-item {
        border: $border-size dashed $advance-border-color;
        &:hover {
          border: $border-size solid $advance-active-border-color;
          background-color: $advance-active-background-color;
        }
      }
      .active {
        border: $border-size solid $advance-active-border-color;
        background-color: $advance-active-background-color;
      }
    }

    .layout {
      .move-active {
        background-color: $layout-active-border-color;
      }
      .tool {
        background-color: $layout-active-border-color;
      }
      .form-item {
        border: $border-size dashed $layout-border-color;
        &:hover {
          border: $border-size solid $layout-active-border-color;
          background-color: $layout-active-background-color;
        }
      }
      .active {
        border: $border-size solid $layout-active-border-color;
        background-color: $layout-active-background-color;
      }
    }
    .tips {
      position: absolute;
      right: 4px;
      top: 0px;
      font-size: 11px;
      color: $key-color;
      padding: 2px;
      z-index: 100;
      font-weight: 700;
    }
    .move {
      color: $basic-border-color;
      cursor: move;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 100;
    }
    .move-active {
      color: #fff;
    }
    .tool {
      color: #fff;
      cursor: pointer;
      position: absolute;
      right: 0px;
      bottom: 0px;
      padding: 2px;
      z-index: 100;
    }
  }
</style>
