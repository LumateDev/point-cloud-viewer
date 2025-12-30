<template>
  <div class="page-container">
    <h2>Внешний вид</h2>

    <div class="settings-section">
      <h3 class="section-title">Тема оформления</h3>

      <div class="theme-settings">
        <el-radio-group v-model="appStore.theme">
          <el-radio value="light" size="large">
            <div class="theme-option">
              <div class="theme-preview light-theme"></div>
              <span>Светлая тема</span>
            </div>
          </el-radio>
          <el-radio value="dark" size="large">
            <div class="theme-option">
              <div class="theme-preview dark-theme"></div>
              <span>Темная тема</span>
            </div>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@renderer/stores/app';

const appStore = useAppStore();
</script>

<style lang="scss" scoped>
/* Ваши стили остаются без изменений */
.page-container {
  padding: 16px;
}

.settings-section {
  max-width: 600px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.theme-settings {
  :deep(.el-radio-group) {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }

  :deep(.el-radio) {
    flex: 1;
    border: 1px solid var(--el-border-color);
    border-radius: 8px;
    padding: 12px 20px 12px 12px;
    margin-right: 0;
    height: auto;
    transition: all 0.3s;
    background-color: var(--el-bg-color);

    &:hover {
      border-color: var(--el-color-primary);
      background-color: var(--el-fill-color-light);
    }

    &.is-checked {
      border-color: var(--el-color-primary);
      background-color: var(--el-color-primary-light-9);
    }

    .el-radio__label {
      width: 100%;
    }
  }

  .theme-option {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  .theme-preview {
    width: 40px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid var(--el-border-color);
    flex-shrink: 0;

    &.light-theme {
      background: linear-gradient(90deg, #ffffff 50%, #f0f2f5 50%);
    }

    &.dark-theme {
      background: linear-gradient(90deg, #1d1e1f 50%, #2b2d30 50%);
    }
  }
}
</style>
