<template>
  <div>
    <n-grid x-gap="12" :cols="24">
      <n-gi span="4">
        <ToolPanel />
      </n-gi>
      <n-gi span="14">
        <div class="form-container">
          <div class="toolbar">
            <n-space>
              <n-button strong secondary @click="importInfo" round size="small">
                <template #icon>
                  <n-icon>
                    <CloudUploadOutlined />
                  </n-icon>
                </template>

                导入
              </n-button>
              <n-button strong secondary @click="exportInfo" round size="small">
                <template #icon>
                  <n-icon>
                    <CloudDownloadOutlined />
                  </n-icon>
                </template>
                导出
              </n-button>
              <n-button strong secondary @click="preview" round size="small" type="success">
                <template #icon>
                  <n-icon>
                    <CompassOutlined />
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
                      <n-icon>
                        <ClearOutlined />
                      </n-icon>
                    </template>
                    清空
                  </n-button>
                </template>

                是否确认要清空数据?
              </n-popconfirm>

              <n-button strong secondary @click="save" round size="small" type="info">
                <template #icon>
                  <n-icon>
                    <SaveFilled />
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
        <n-input readonly rows="8" type="textarea" v-model:value="exportJsonInfo" />
      </div>
      <template #action>
        <div>
          <n-button @click="copy">复制</n-button>
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

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import ToolPanel from './ToolPanel.vue';
  import FormView from './FormView.vue';
  import ElementPropertie from './ElementPropertie.vue';
  import GenerateForm from './GenerateForm.vue';

  import {
    ClearOutlined,
    CloudDownloadOutlined,
    CloudUploadOutlined,
    CompassOutlined,
    SaveFilled,
  } from '@vicons/antd';

  import { ElementItem, PageOptions } from './';
  import useClipboard from 'vue-clipboard3';

  const formViewRef = ref();
  const showExportInfo = ref(false);
  const showImportInfo = ref(false);
  const showPreview = ref(false);

  const exportJsonInfo = ref('');
  const importJson = ref('');
  const gformRef = ref();

  let selectElementItem = ref<ElementItem>();

  const message = useMessage();
  const { toClipboard } = useClipboard();
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
    try {
      console.log(exportJsonInfo.value);
      await toClipboard(exportJsonInfo.value);
      message.success('复制成功');
      console.log('Copied to clipboard');
    } catch (e) {
      console.error(e);
      message.error('复制失败');
    }
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
<style lang="scss" scoped>
  code {
    font-size: 11px;

    word-break: break-all;
  }
  .form-container {
    border-left: 1px solid #ececec;
    border-right: 1px solid #ececec;
    padding: 0 8px;
    .toolbar {
      padding: 0 0 5px 0;
      margin: 0 0 5px 0;
      border-bottom: 1px solid #ececec;
    }
  }
</style>
