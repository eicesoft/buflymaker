<template>
  <div class="form-view-container">
    <n-form
      aria-readonly="true"
      :label-placement="option.position"
      :label-align="option.align"
      :label-width="option.labelWidth"
      :size="option.size"
      ref="formRef"
    >
      <draggable
        class="draggable form-list"
        animation="300"
        handle=".move"
        ghostClass="ghost"
        v-model="listRef"
        :group="{ name: 'formui' }"
        item-key="key"
      >
        <template #item="{ element, index }">
          <template v-if="element.comp_type === ElementGroup.layout">
            <div
              @click.stop="changeSelect(element)"
              class="form-view layout"
              :class="{
                hide: element.hide,
              }"
            >
              <div
                :class="{
                  active: selectElement != null && selectElement.key === element.key,
                  'form-item': true,
                }"
              >
                <div
                  :class="{
                    'move-active': selectElement != null && selectElement.key === element.key,
                    move: true,
                    icon: true,
                  }"
                >
                  <n-icon size="20">
                    <SvgIcon name="move" color="#fff" />
                  </n-icon>
                </div>

                <div
                  v-show="selectElement != null && selectElement.key === element.key"
                  class="tool"
                >
                  <n-icon @click="copyItem(index, element)" class="icon" size="22">
                    <SvgIcon name="copy" color="#fff" />
                  </n-icon>

                  <n-icon @click="removeItem(index)" class="icon" size="22">
                    <SvgIcon name="delete" color="#fff" />
                  </n-icon>
                </div>

                <div class="tips">{{ element.key }}</div>

                <template v-if="element?.type === ElementTypes.grid">
                  <n-grid x-gap="1" :cols="element.columns.length">
                    <n-gi
                      style="border: 1px dashed #ececec"
                      :key="col_index"
                      v-for="(column, col_index) in element.columns"
                    >
                      <draggable
                        class="draggable"
                        animation="300"
                        handle=".move"
                        ghostClass="ghost"
                        v-model="column.list"
                        :group="{ name: 'formui' }"
                        item-key="key"
                      >
                        <template #item="{ element, index }">
                          <FormItem
                            :class="{ hide: element.hide }"
                            @copy="copyItem"
                            @remove="removeItem"
                            :data="element"
                            :index="index"
                            :active="selectElement != null && selectElement.key === element.key"
                            @change-item="changeSelect"
                          />
                        </template>
                      </draggable>
                    </n-gi>
                  </n-grid>
                </template>

                <template v-else-if="element?.type === ElementTypes.tab">
                  <n-tabs type="line">
                    <n-tab-pane
                      :name="column.name"
                      :tab="column.name"
                      :key="col_index"
                      v-for="(column, col_index) in element.columns"
                    >
                      <draggable
                        class="draggable"
                        animation="300"
                        handle=".move"
                        ghostClass="ghost"
                        v-model="column.list"
                        :group="{ name: 'formui' }"
                        item-key="key"
                      >
                        <template #item="{ element, index }">
                          <FormItem
                            :class="{ hide: element.hide }"
                            @copy="copyItem"
                            @remove="removeItem"
                            :data="element"
                            :index="index"
                            :active="selectElement != null && selectElement.key === element.key"
                            @change-item="changeSelect"
                          />
                        </template>
                      </draggable>
                    </n-tab-pane>
                  </n-tabs>
                </template>

                <template v-else-if="element?.type === ElementTypes.divider">
                  <n-divider />
                </template>
              </div>
            </div>
          </template>

          <template v-else>
            <FormItem
              :class="{ hide: element.hide }"
              @copy="copyItem"
              @remove="removeItem"
              :data="element"
              :index="index"
              :active="selectElement != null && selectElement.key === element.key"
              @change-item="changeSelect"
            />
          </template>
        </template>
      </draggable>
    </n-form>
  </div>
</template>

<script name="FormView" lang="ts" setup>
  import { ref, PropType, watch } from 'vue';
  import { ElementItem, PageOptions, ElementGroup, ElementTypes } from './';
  import { cloneDeep, uniqueId } from './util';
  import { NForm, NDivider, NIcon, NTabs, NTabPane, NGrid, NGi } from 'naive-ui';
  import draggable from 'vuedraggable';
  import SvgIcon from './SvgIcon.vue';
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
    select: {
      type: Object as PropType<ElementItem>,
    },
  });

  const emit = defineEmits(['select-item', 'remove-item', 'update:list', 'update:select']);

  let listRef = ref<ElementItem[]>(props.list);
  let selectElement = ref<ElementItem>();

  watch(
    () => props.list,
    (list) => {
      console.log('change list', list);
      listRef.value = list;
    }
  );

  watch(
    () => props.select,
    (s) => {
      selectElement.value = s;
      emit('update:select', s);
    },
    {
      immediate: true,
      deep: true,
    }
  );

  watch(listRef, (list: any) => {
    console.log('watch', list);
    emit('update:list', list);
  });

  const changeSelect = (item: ElementItem) => {
    selectElement.value = item;
    emit('select-item', item);
  };

  const removeItem = (index) => {
    listRef.value.splice(index, 1);
  };

  const cloneElement = (item: ElementItem) => {
    let clone_item = cloneDeep(item);
    clone_item.label = item.label;
    clone_item.key = uniqueId('ele_');
    clone_item.comp_type = item.comp_type;

    return clone_item;
  };

  const copyItem = (index: number, item: ElementItem) => {
    listRef.value.splice(index + 1, 0, cloneElement(item));
  };

  const clearSelect = () => {
    selectElement.value = undefined;
  };

  defineExpose({
    clearSelect,
  });
</script>
<style lang="scss">
  @import './style.scss';
  .form-view-container {
    border: 1px dashed #ececec;
  }
</style>
