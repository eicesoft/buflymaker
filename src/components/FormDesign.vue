<template>
  <div class="container">
    <n-grid style="min-height: 100%" x-gap="12" :cols="24">
      <n-gi span="4">
        <ToolPanel />
      </n-gi>
      <n-gi span="14">
        <div class="form-container">
          <div class="toolbar">
            <n-space>
              <n-button strong secondary @click="importInfo" round size="small">
                <template #icon>
                  <n-icon size="16">
                    <SvgIcon name="import" />
                  </n-icon>
                </template>
                导入
              </n-button>

              <n-button strong secondary @click="exportInfo" round size="small">
                <template #icon>
                  <n-icon size="16">
                    <SvgIcon name="export" />
                  </n-icon>
                </template>
                导出
              </n-button>

              <n-button strong secondary @click="preview" round size="small" type="success">
                <template #icon>
                  <n-icon size="16">
                    <SvgIcon name="preview" color="#18a058" />
                  </n-icon>
                </template>
                预览
              </n-button>

              <n-popconfirm
                @positive-click="clear"
                placement="bottom"
                negative-text="取消"
                positive-text="确定"
              >
                <template #trigger>
                  <n-button strong secondary round size="small" type="error">
                    <template #icon>
                      <n-icon size="16">
                        <SvgIcon name="clear" color="#d03050" />
                      </n-icon>
                    </template>
                    清空
                  </n-button>
                </template>

                是否确认要清空数据?
              </n-popconfirm>

              <n-button strong secondary @click="save" round size="small" type="info">
                <template #icon>
                  <n-icon size="16">
                    <SvgIcon name="save" color="#2080f0" />
                  </n-icon>
                </template>
                保存
              </n-button>
            </n-space>
          </div>

          <FormView
            :option="pageOption"
            v-model:list="list"
            ref="formViewRef"
            @select-item="changeElement"
          />
        </div>
      </n-gi>
      <n-gi span="6">
        <ElementPropertie v-model:pageOption="pageOption" :select="selectElementItem" />
      </n-gi>
    </n-grid>

    <n-modal
      style="width: 50% !important"
      :mask-closable="false"
      v-model:show="showExportInfo"
      preset="dialog"
      title="Dialog"
    >
      <template #header>
        <div>表单信息</div>
      </template>
      <div>
        <n-input autofocus readonly rows="8" type="textarea" v-model:value="exportJsonInfo" />
      </div>
      <template #action>
        <div>
          <n-button v-clipboard="exportJsonInfo">复制</n-button>
        </div>
      </template>
    </n-modal>

    <n-modal
      style="width: 50% !important"
      :mask-closable="false"
      v-model:show="showImportInfo"
      preset="dialog"
      title="Dialog"
    >
      <template #header>
        <div>表单信息</div>
      </template>
      <div>
        <n-input rows="8" type="textarea" v-model:value="importJson" />
      </div>
      <template #action>
        <div>
          <n-button @click="importJsonInfo">导入</n-button>
        </div>
      </template>
    </n-modal>

    <n-modal
      style="width: 50% !important"
      :mask-closable="false"
      v-model:show="showPreview"
      preset="dialog"
      role="dialog"
      aria-modal="true"
    >
      <template #header>
        <div>表单预览</div>
      </template>
      <div>
        <GenerateForm ref="gformRef" :option="pageOption" :list="list" />
      </div>
      <template #action>
        <div>
          <n-space>
            <n-button strong secondary type="info" @click="showValue">显示值</n-button>
            <n-button strong secondary @click="showPreview = false">关闭</n-button>
          </n-space>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script name="FormDesign" lang="ts" setup>
  import { ref } from 'vue';
  import {
    useMessage,
    NGi,
    NGrid,
    NModal,
    NButton,
    NInput,
    NSpace,
    NIcon,
    NPopconfirm,
  } from 'naive-ui';
  import ToolPanel from './ToolPanel.vue';
  import FormView from './FormView.vue';
  import ElementPropertie from './ElementPropertie.vue';
  import GenerateForm from './GenerateForm.vue';
  import SvgIcon from './SvgIcon.vue';
  import { ElementItem, PageOptions } from './';

  const formViewRef = ref();
  const showExportInfo = ref(false);
  const showImportInfo = ref(false);
  const showPreview = ref(false);

  const exportJsonInfo = ref('');
  const importJson = ref('');
  const gformRef = ref();

  let selectElementItem = ref<ElementItem>();

  const message = useMessage();
  let list = ref([]);

  let pageOption = ref<PageOptions>({
    size: 'small',
    align: 'left',
    position: 'left',
    labelWidth: 'auto',
  });

  const changeElement = (item: ElementItem) => {
    selectElementItem.value = item;
  };

  const clear = () => {
    selectElementItem.value = undefined;
    list.value = [];
  };

  const exportInfo = () => {
    showExportInfo.value = true;
    const exportJson = {
      option: pageOption.value,
      list: list.value,
    };
    exportJsonInfo.value = JSON.stringify(exportJson);
  };

  const importInfo = () => {
    showImportInfo.value = true;
    importJson.value = '';
  };

  const preview = () => {
    showPreview.value = true;
  };

  const importJsonInfo = () => {
    try {
      const importObj = JSON.parse(importJson.value);
      if (importObj.option && importObj.list) {
        pageOption.value = importObj.option;
        list.value = importObj.list;
        showImportInfo.value = false;
        message.success('导入数据成功');
      } else {
        message.warning('导入数据异常, 缺少必备字段');
      }
    } catch (e) {
      message.warning('导入数据异常:' + e);
    }
  };

  const copy = async () => {
    message.success('复制成功');
  };

  const showValue = () => {
    message.info(JSON.stringify(gformRef.value.GetValue()));
  };

  const emit = defineEmits(['save']);
  const save = () => {
    const formConfig = {
      option: pageOption.value,
      list: list.value,
    };
    emit('save', formConfig);
  };
</script>
<style lang="scss">
  body {
    height: 100%;
  }
  .ghost {
    background: #f83838;
    border: 1px solid #f83838;
    outline-width: 0;
    height: 3px;
    box-sizing: border-box;
    font-size: 0;
    content: '';
    overflow: hidden;
    padding: 0;
  }
  .move {
    cursor: move;
  }
</style>
<style lang="scss">
  .container {
    height: calc(100% - 50px);

    code {
      font-size: 11px;
      word-break: break-all;
    }
    .form-container {
      position: relative;
      margin: 8px;
      .toolbar {
        padding: 0 0 5px 0;
        margin: 0 0 5px 0;
        border-bottom: 1px solid #ececec;
      }
    }
  }
</style>
