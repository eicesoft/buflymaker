<script setup lang="ts">
  import { NDialogProvider, NNotificationProvider, NMessageProvider } from 'naive-ui';
  import FormDesign from './components/FormDesign.vue';

  const save = (config) => {
    console.log(config);
  };
</script>

<template>
  <div class="app">
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <FormDesign @save="save" />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    margin: 10px;
  }
</style>
