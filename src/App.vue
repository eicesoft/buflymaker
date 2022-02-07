<script setup lang="ts">
  import { NDialogProvider, NNotificationProvider, NMessageProvider, NIcon } from 'naive-ui';
  import FormDesign from './components/FormDesign.vue';
  import info from '../package.json';

  const save = (config) => {
    console.log(config);
  };
</script>

<template>
  <n-dialog-provider>
    <n-notification-provider>
      <n-message-provider>
        <div class="header">
          <div>{{ info.name.toUpperCase() }} - {{ info.version }}</div>
          <div class="iconbar">
            <n-icon size="24"
              ><a href="https://www.npmjs.com/package/buflymaker" target="_blank">
                <svg viewBox="0 0 27.23 27.23">
                  <rect fill="#333333" width="27.23" height="27.23" rx="2"></rect>
                  <polygon
                    fill="#fff"
                    points="5.8 21.75 13.66 21.75 13.67 9.98 17.59 9.98 17.58 21.76 21.51 21.76 21.52 6.06 5.82 6.04 5.8 21.75"
                  ></polygon>
                </svg>
              </a>
            </n-icon>
            <n-icon size="24">
              <a title="Git 代码库" href="https://github.com/eicesoft/buflymaker" target="_blank">
                <svg
                  aria-hidden="true"
                  height="24"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="24"
                  data-view-component="true"
                  class="octicon octicon-mark-github d-block mr-2 float-left"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  ></path>
                </svg>
              </a>
            </n-icon>
          </div>
        </div>
        <FormDesign @save="save" />
      </n-message-provider>
    </n-notification-provider>
  </n-dialog-provider>
</template>

<style lang="scss">
  #app {
    height: 100%;
  }

  .header {
    background-image: linear-gradient(78deg, #0080003d, #18a058);
    background-color: #0080003d;
    color: #18a058;
    padding: 0 10px;
    font-weight: 800;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    .iconbar {
      display: flex;
      vertical-align: middle;
      height: 28px;
      .n-icon {
        margin-right: 8px;
      }
    }
  }
</style>
