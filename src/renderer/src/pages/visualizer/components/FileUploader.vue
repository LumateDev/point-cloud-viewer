<template>
  <el-card class="file-uploader" shadow="hover">
    <template #header>
      <div class="card-header">
        <el-icon :size="20" class="header-icon">
          <IconMdiUpload />
        </el-icon>
        <span class="header-title">Загрузить файл вручную</span>
      </div>
    </template>

    <div
      class="drop-zone"
      :class="{ 'is-dragover': isDragover }"
      @dragenter.prevent="onDragEnter"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      @click="openFileDialog"
    >
      <div class="drop-content">
        <el-icon :size="48" class="drop-icon">
          <IconMdiCloudUpload v-if="!isDragover" />
          <IconMdiTrayArrowDown v-else />
        </el-icon>

        <p class="drop-title">
          {{ isDragover ? 'Отпустите файл' : 'Перетащите файл сюда' }}
        </p>

        <p class="drop-hint">или нажмите для выбора</p>

        <div class="supported-formats">
          <el-tag size="small" type="info">.xyz</el-tag>
          <el-tag size="small" type="info">.las</el-tag>
          <el-tag size="small" type="info">.laz</el-tag>
        </div>
      </div>
    </div>

    <!-- Ошибка -->
    <el-alert v-if="error" :title="error" type="error" show-icon closable class="upload-error" @close="error = null" />
  </el-card>
</template>

<script setup lang="ts">
import { useVisualizerStore } from '@renderer/pages/visualizer/visualizerStore';

const emit = defineEmits<{
  (e: 'file-selected', file: { name: string; path: string }): void;
}>();

const visualizerStore = useVisualizerStore();

const isDragover = ref(false);
const error = ref<string | null>(null);

const SUPPORTED_EXTENSIONS = ['.xyz', '.las', '.laz'];

function isValidFile(fileName: string): boolean {
  const ext = fileName.toLowerCase().slice(fileName.lastIndexOf('.'));
  return SUPPORTED_EXTENSIONS.includes(ext);
}

function onDragEnter() {
  isDragover.value = true;
}

function onDragOver() {
  isDragover.value = true;
}

function onDragLeave() {
  isDragover.value = false;
}

function onDrop(event: DragEvent) {
  isDragover.value = false;
  error.value = null;

  const files = event.dataTransfer?.files;
  if (!files || files.length === 0) return;

  const file = files[0];

  if (!isValidFile(file.name)) {
    error.value = `Неподдерживаемый формат. Поддерживаются: ${SUPPORTED_EXTENSIONS.join(', ')}`;
    return;
  }

  const filePath = (file as File & { path: string }).path;

  if (!filePath) {
    error.value = 'Не удалось получить путь к файлу';
    return;
  }

  const success = visualizerStore.setFile({ name: file.name, path: filePath }, 'manual');

  if (success) {
    emit('file-selected', { name: file.name, path: filePath });
  }
}

async function openFileDialog() {
  error.value = null;

  try {
    const result = await window.api.openFileDialog({
      title: 'Выберите файл облака точек',
      filters: [
        {
          name: 'Point Cloud Files',
          extensions: ['xyz', 'las', 'laz'],
        },
        { name: 'All Files', extensions: ['*'] },
      ],
    });

    if (result.canceled || !result.filePaths.length) return;

    const filePath = result.filePaths[0];
    const fileName = filePath.split(/[/\\]/).pop() || 'unknown';

    if (!isValidFile(fileName)) {
      error.value = `Неподдерживаемый формат. Поддерживаются: ${SUPPORTED_EXTENSIONS.join(', ')}`;
      return;
    }

    const success = visualizerStore.setFile({ name: fileName, path: filePath }, 'manual');

    if (success) {
      emit('file-selected', { name: fileName, path: filePath });
    }
  } catch (err) {
    error.value = 'Ошибка при открытии диалога выбора файла';
    console.error(err);
  }
}
</script>

<style lang="scss" scoped>
.file-uploader {
  .card-header {
    display: flex;
    align-items: center;
    gap: 8px;

    .header-icon {
      color: var(--el-color-primary);
    }

    .header-title {
      font-weight: 500;
    }
  }

  .drop-zone {
    border: 2px dashed var(--el-border-color);
    border-radius: 8px;
    padding: 32px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: var(--el-fill-color-lighter);

    &:hover {
      border-color: var(--el-color-primary);
      background: var(--el-color-primary-light-9);
    }

    &.is-dragover {
      border-color: var(--el-color-primary);
      background: var(--el-color-primary-light-8);
      transform: scale(1.01);

      .drop-icon {
        color: var(--el-color-primary);
        animation: bounce 0.5s ease infinite alternate;
      }
    }

    .drop-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .drop-icon {
      color: var(--el-text-color-secondary);
      transition: color 0.3s;
    }

    .drop-title {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      color: var(--el-text-color-primary);
    }

    .drop-hint {
      margin: 0;
      font-size: 13px;
      color: var(--el-text-color-secondary);
    }

    .supported-formats {
      display: flex;
      gap: 6px;
      margin-top: 8px;
    }
  }

  .upload-error {
    margin-top: 12px;
  }
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-5px);
  }
}
</style>
