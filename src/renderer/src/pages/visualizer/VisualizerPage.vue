<template>
  <div class="visualizer-page">
    <!-- Визуализатор (когда файл загружен) -->
    <PointCloudViewer v-if="visualizerStore.hasContent" />

    <!-- Выбор файла (когда файл не загружен) -->
    <el-scrollbar v-else class="file-selection-scrollbar">
      <div class="file-selection">
        <div class="page-header">
          <h2>
            <el-icon><IconMdiCubeOutline /></el-icon>
            Визуализатор облака точек
          </h2>
          <p class="subtitle">Выберите файл из датасета или загрузите вручную</p>
        </div>

        <!-- Dataset Pickers -->
        <div class="dataset-pickers">
          <DatasetPicker type="raw" title="Сырые данные" :dataset-path="appStore.rawDatasetsPath" />
          <DatasetPicker type="labeled" title="Размеченные данные" :dataset-path="appStore.labeledDatasetsPath" />
          <DatasetPicker type="predicted" title="Предсказанные данные" :dataset-path="appStore.predictedDatasetsPath" />
        </div>

        <!-- File Uploader -->
        <div class="manual-upload">
          <FileUploader />
        </div>
      </div>
    </el-scrollbar>

    <!-- Loading Overlay -->
    <div v-if="visualizerStore.isLoading" class="loading-overlay">
      <el-icon class="is-loading" :size="48"><IconMdiLoading /></el-icon>
      <p>Загрузка облака точек...</p>
      <el-progress
        v-if="visualizerStore.loadingProgress > 0"
        :percentage="visualizerStore.loadingProgress"
        :stroke-width="8"
        style="width: 200px"
      />
    </div>

    <!-- Error Message -->
    <el-alert
      v-if="visualizerStore.error"
      :title="visualizerStore.error"
      type="error"
      show-icon
      closable
      class="global-error"
      @close="visualizerStore.setError(null)"
    />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@renderer/stores/app';
import { useVisualizerStore } from '@renderer/pages/visualizer/visualizerStore';
import DatasetPicker from './components/DatasetPicker.vue';
import FileUploader from './components/FileUploader.vue';
import PointCloudViewer from './components/PointCloudViewer.vue';

const appStore = useAppStore();
const visualizerStore = useVisualizerStore();
</script>

<style lang="scss" scoped>
.visualizer-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .file-selection-scrollbar {
    flex: 1;
    padding: 16px;

    :deep(.el-scrollbar__wrap) {
      scrollbar-width: thin;
    }
  }

  .file-selection {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-height: 100%;
  }

  .page-header {
    text-align: center;
    margin-bottom: 8px;

    h2 {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin: 0 0 8px 0;
      color: var(--el-text-color-primary);
    }

    .subtitle {
      margin: 0;
      color: var(--el-text-color-secondary);
      font-size: 14px;
    }
  }

  .dataset-pickers {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }

  .manual-upload {
    padding-top: 16px;
  }

  .loading-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: var(--el-overlay-color-lighter);
    color: var(--el-text-color-primary);
    z-index: 100;
    border-radius: 8px;
  }

  .global-error {
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
    z-index: 101;
  }
}
</style>
