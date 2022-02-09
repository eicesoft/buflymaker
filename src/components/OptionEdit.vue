<template>
  <n-tabs v-model:value="type" type="line">
    <n-tab-pane name="static" tab="静态">
      <div class="flex-list">
        <draggable
          handle=".move"
          v-model="compOptions"
          tag="transition-group"
          item-key="label"
          :sort="true"
        >
          <template #item="{ element, index }">
            <div inline class="flex-item">
              <div>
                <n-icon class="move" size="20">
                  <SvgIcon name="bars" color="#cccccc" />
                </n-icon>
              </div>
              <div>
                <n-input v-model:value="element.label" type="text" placeholder="标签" />
              </div>
              <div>
                <n-input-number v-model:value="element.value" placeholder="值" clearable />
              </div>
              <div>
                <n-icon size="22" @click="removeItem(index)">
                  <SvgIcon name="delete" />
                </n-icon>
              </div>
            </div>
          </template>
        </draggable>

        <n-button block ghost strong @click="add">添加</n-button>
      </div>
    </n-tab-pane>
    <n-tab-pane name="dynamic" tab="动态">
      <n-form
        label-placement="left"
        label-width="auto"
        :model="remoteOption"
        :size="'small'"
        ref="formRef"
      >
        <n-form-item label="数据方法">
          <n-input v-model:value="remoteOption.method" type="text" placeholder="请输入数据方法" />
        </n-form-item>
        <n-form-item label="值">
          <n-input v-model:value="remoteOption.value" type="text" placeholder="请输入值名称" />
        </n-form-item>
        <n-form-item label="标签">
          <n-input v-model:value="remoteOption.label" type="text" placeholder="请输入标签名称" />
        </n-form-item>
      </n-form>
    </n-tab-pane>
  </n-tabs>
</template>

<script name="OptionEdit" lang="ts" setup>
  import {
    NInput,
    NInputNumber,
    NButton,
    NIcon,
    NTabs,
    NTabPane,
    NForm,
    NFormItem,
  } from 'naive-ui';
  import SvgIcon from './SvgIcon.vue';

  import { OptionItem, RemoteOption } from './';

  import draggable from 'vuedraggable';
  import { ref, watch, PropType } from 'vue';

  const props = defineProps({
    options: {
      type: Array as PropType<OptionItem[]>,
      required: true,
      default() {
        return [];
      },
    },
    remote: {
      type: Object as PropType<RemoteOption>,
      defualt() {
        return {
          method: 'remote_func',
          label: 'label',
          value: 'value',
        };
      },
    },
    mode: {
      type: Boolean,
      default: false,
    },
  });

  const type = ref<string | number>(props.mode ? 'dynamic' : 'static');
  const compOptions = ref<OptionItem[]>(props.options);
  const remoteOption = ref(props.remote);

  watch(
    () => props.options,
    (options) => {
      console.log('change options', options);
      compOptions.value = options;
    }
  );

  watch(
    () => props.remote,
    (remote) => {
      console.log('change remote', remote);
      remoteOption.value = remote;
    }
  );

  const emit = defineEmits(['update:options', 'update:remote', 'update:mode']);

  watch(type, (val) => {
    if (val === 'static') {
      emit('update:mode', 0);
    } else {
      emit('update:mode', 1);
    }
  });

  watch(compOptions, (options) => {
    console.log('watch options: ', options);
    emit('update:options', options);
  });

  watch(remoteOption, (remote) => {
    console.log('watch remote: ', remote);
    emit('update:remote', remote);
  });

  const add = () => {
    let index = compOptions.value.length + 1;
    compOptions.value.push({
      label: `选项${index}`,
      value: index,
    });
  };

  const removeItem = (index: number) => {
    console.log(index);
    compOptions.value.splice(index, 1);
  };
</script>

<style lang="scss" scoped>
  .flex-list {
    display: block;
    .flex-item {
      width: 100%;
      display: flex;
      margin: 4px 0;

      div {
        margin: 0 4px;
      }
    }
  }
</style>
