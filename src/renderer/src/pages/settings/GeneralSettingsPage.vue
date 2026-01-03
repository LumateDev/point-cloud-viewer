<template>
  <div class="page-container">
    <h2>Общие настройки</h2>

    <div class="settings-section">
      <!-- Режим разработчика -->
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-title">Режим разработчика</span>
          <span class="setting-desc">Включает расширенные логи и инструменты отладки</span>
        </div>
        <el-switch v-model="appStore.isDevMode" />
      </div>

      <!-- Путь для сырых датасетов -->
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-title">Папка для сырых датасетов</span>
          <span class="setting-desc">Путь к неразмеченным датасетам для испытания нейросети</span>
        </div>
        <div class="path-selector">
          <ClearableInput
            v-model="appStore.rawDatasetsPath"
            placeholder="Выберите папку для сырых датасетов"
            @clear="handleClearSuccess('сырых датасетов')"
          />
          <el-button @click="selectRawDatasetsPath" type="primary" size="small"> Выбрать </el-button>
        </div>
      </div>

      <!-- Путь для размеченных датасетов -->
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-title">Папка для размеченных датасетов</span>
          <span class="setting-desc">Путь к размеченным датасетам для обучения</span>
        </div>
        <div class="path-selector">
          <ClearableInput
            v-model="appStore.labeledDatasetsPath"
            placeholder="Выберите папку для размеченных датасетов"
            @clear="handleClearSuccess('размеченных датасетов')"
          />
          <el-button @click="selectLabeledDatasetsPath" type="primary" size="small"> Выбрать </el-button>
        </div>
      </div>

      <!-- Путь для распознанных датасетов -->
      <div class="setting-row">
        <div class="setting-info">
          <span class="setting-title">Папка для распознанных датасетов</span>
          <span class="setting-desc">Путь к датасетам, распознанным нейросетью</span>
        </div>
        <div class="path-selector">
          <ClearableInput
            v-model="appStore.predictedDatasetsPath"
            placeholder="Выберите папку для распознанных датасетов"
            @clear="handleClearSuccess('распознанных датасетов')"
          />
          <el-button @click="selectPredictedDatasetsPath" type="primary" size="small"> Выбрать </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@renderer/stores/app';
import ClearableInput from '@renderer/components/UI/ClearableInput/ClearableInput.vue';

const appStore = useAppStore();

const selectRawDatasetsPath = async () => {
  try {
    const result = await window.api.openDirectoryDialog({
      title: 'Выберите папку для сырых датасетов',
    });

    if (!result.canceled && result.filePaths.length > 0) {
      appStore.rawDatasetsPath = result.filePaths[0];
      ElMessage.success('Путь для сырых датасетов установлен');
    }
  } catch (error) {
    console.error('Ошибка при выборе папки:', error);
    ElMessage.error('Не удалось выбрать папку для сырых датасетов');
  }
};

const selectLabeledDatasetsPath = async () => {
  try {
    const result = await window.api.openDirectoryDialog({
      title: 'Выберите папку для размеченных датасетов',
    });

    if (!result.canceled && result.filePaths.length > 0) {
      appStore.labeledDatasetsPath = result.filePaths[0];
      ElMessage.success('Путь для размеченных датасетов установлен');
    }
  } catch (error) {
    console.error('Ошибка при выборе папки:', error);
    ElMessage.error('Не удалось выбрать папку для размеченных датасетов');
  }
};

const selectPredictedDatasetsPath = async () => {
  try {
    const result = await window.api.openDirectoryDialog({
      title: 'Выберите папку для распознанных датасетов',
    });

    if (!result.canceled && result.filePaths.length > 0) {
      appStore.predictedDatasetsPath = result.filePaths[0];
      ElMessage.success('Путь для распознанных датасетов установлен');
    }
  } catch (error) {
    console.error('Ошибка при выборе папки:', error);
    ElMessage.error('Не удалось выбрать папку для распознанных датасетов');
  }
};

const handleClearSuccess = (datasetType: string) => {
  ElMessage.success(`Путь для ${datasetType} очищен`);
};
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

  .path-selector {
    display: flex;
    gap: 8px;
    min-width: 400px;
    align-items: center;

    .clearable-input-wrapper {
      flex: 1;
    }
  }
}

.setting-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 16px;

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
