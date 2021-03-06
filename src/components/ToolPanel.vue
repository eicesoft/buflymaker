<template>
  <div class="comp-group" v-for="(comps, key) in configs.components" :key="key">
    <div class="comp-title">{{ comps.label }}</div>

    <draggable
      class="comp-item"
      v-model="comps.list"
      animation="300"
      :group="{ name: 'formui', pull: 'clone', put: false }"
      :clone="cloneElement"
      item-key="key"
      :sort="false"
    >
      <template #item="{ element }">
        <div class="element-comp">
          <span class="iconfont" :class="element.icon"></span>
          {{ element.label }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed, Ref } from 'vue';
  import { ElementItem, Configs } from './';
  import { cloneDeep, uniqueId } from 'lodash-es';
  import draggable from 'vuedraggable';

  const configs = reactive(Configs);

  let elementId: Ref<number> = ref<number>(0);

  const ComponentTypes = computed(() => {
    const CompKeys = {};
    for (let key in Configs.components) {
      let comps = Configs.components[key];
      for (let comp of comps.list) {
        CompKeys[comp.type] = key;
      }
    }

    return CompKeys;
  });

  const cloneElement = (item: ElementItem) => {
    let clone_item: ElementItem = cloneDeep(item);
    clone_item.label = item.label + '_' + ++elementId.value;
    clone_item.key = uniqueId('ele_' + new Date().getTime() + '_');
    clone_item.comp_type = ComponentTypes.value[item.type];
    console.log(clone_item);

    return clone_item;
  };
</script>

<style lang="scss" scoped>
  $active_color: #409eff;
  $color: #636363;
  .comp-group {
    user-select: none;
    .comp-title {
      margin: 4px 2px;
      font-size: 15px;
      padding: 0 8px;
      border-left: 4px solid $active_color;
    }

    .comp-item {
      display: flex;
      flex-flow: row wrap;

      .element-comp {
        border: 1px solid $color;
        font-size: 12px;
        color: $color;
        margin: 4px;
        padding: 4px;
        border-radius: 2px;
        cursor: move;
        &:hover {
          border: 1px solid $active_color;
          color: $active_color;
        }
      }
    }
  }
</style>
