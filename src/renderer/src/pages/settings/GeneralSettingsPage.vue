<template>
  <div class="page-container">
    <h2>Общие настройки</h2>

    <div class="settings-section">
      <!-- Блок настроек -->
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-title">Режим разработчика</span>
          <span class="setting-desc">Включает расширенные логи и инструменты отладки</span>
        </div>
        <el-switch v-model="appStore.isDevMode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@renderer/stores/app';

const appStore = useAppStore();
</script>

<style lang="scss" scoped>
.page-container {
  padding: 16px;
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: var(--el-fill-color-light);
  border: 1px solid var(--el-border-color-lighter);
}

.setting-info {
  display: flex;
  flex-direction: column;

  .setting-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--el-text-color-primary);
  }

  .setting-desc {
    font-size: 12px;
    color: var(--el-text-color-secondary);
    margin-top: 4px;
  }
}
</style>
