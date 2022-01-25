<template>
  <div>
    <n-form
      aria-readonly="true"
      :label-placement="option.position"
      :label-align="option.align"
      :label-width="option.labelWidth"
      :size="option.size"
      ref="formRef"
    >
      <div class="form-view">
        <draggable
          class="draggable"
          animation="300"
          handle=".move"
          ghostClass="ghost"
          v-model="listRef"
          :group="{ name: 'formui' }"
          item-key="key"
        >
          <template #item="{ element, index }">
            <FormItem
              @copy="copyItem"
              @remove="removeItem"
              :data="element"
              :index="index"
              :active="selectElement != null && selectElement.key === element.key"
              @change-item="changeSelect"
            />
          </template>
        </draggable>
      </div>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, PropType, watch } from 'vue';
  import { ElementItem, PageOptions } from './';
  import { cloneDeep, uniqueId } from 'lodash-es';

  import draggable from 'vuedraggable';
  import FormItem from './FormItem.vue';

  const formRef = ref(null);
  const props = defineProps({
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

  const emit = defineEmits(['select-item', 'remove-item', 'update:list']);

  let listRef = ref<ElementItem[]>(props.list);

  watch(
    () => props.list,
    (list) => {
      console.log('change list', list);
      listRef.value = list;
    }
  );

  watch(listRef, (list: any) => {
    console.log('watch', list);
    emit('update:list', list);
  });
  let selectElement = ref<ElementItem>();

  const changeSelect = (item: ElementItem) => {
    console.log(item);
    selectElement.value = item;
    emit('select-item', item);
  };

  const removeItem = (index) => {
    listRef.value.splice(index, 1);
  };

  const cloneElement = (item: ElementItem) => {
    let clone_item = cloneDeep(item);
    clone_item.label = item.label;
    clone_item.key = uniqueId('ele_' + new Date().getTime() + '_');
    clone_item.comp_type = item.comp_type;

    return clone_item;
  };

  const copyItem = (index: number, item: ElementItem) => {
    listRef.value.splice(index, 0, cloneElement(item));
  };
</script>
<style lang="scss" scoped>
  .form-view {
    width: 100%;
    user-select: none;
    .draggable {
      padding: 8px;
      min-height: 80px;
    }
  }
</style>
