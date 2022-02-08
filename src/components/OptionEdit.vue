<template>
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
</template>

<script name="OptionEdit" lang="ts" setup>
  import { NInput, NInputNumber, NButton, NIcon } from 'naive-ui';
  import SvgIcon from './SvgIcon.vue';

  import { OptionItem } from './';

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
  });
  const compOptions = ref<OptionItem[]>(props.options);

  watch(
    () => props.options,
    (options) => {
      console.log('change options', options);
      compOptions.value = options;
    }
  );

  const emit = defineEmits(['update:options']);

  watch(compOptions, (options) => {
    console.log('watch options: ', options);
    emit('update:options', options);
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
