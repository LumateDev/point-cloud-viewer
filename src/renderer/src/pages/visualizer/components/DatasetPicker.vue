<template>
  <el-card class="dataset-picker" shadow="hover">
    <template #header>
      <div class="card-header">
        <el-icon :size="20" class="header-icon">
          <IconMdiFolderOpen v-if="datasetPath" />
          <IconMdiFolderAlert v-else />
        </el-icon>
        <span class="header-title">{{ title }}</span>
        <el-tag :type="datasetPath ? 'success' : 'warning'" size="small">
          {{ datasetPath ? 'Настроено' : 'Не настроено' }}
        </el-tag>
      </div>
    </template>

    <!-- Путь не настроен -->
    <div v-if="!datasetPath" class="not-configured">
      <el-icon :size="48" class="warning-icon">
        <IconMdiAlertCircleOutline />
      </el-icon>
      <p class="warning-text">Путь к датасетам не указан</p>
      <p class="warning-hint">Укажите путь в настройках приложения</p>
      <el-button type="primary" plain @click="goToSettings">
        <el-icon><IconMdiCog /></el-icon>
        Открыть настройки
      </el-button>
    </div>

    <!-- Путь настроен -->
    <div v-else class="configured">
      <div class="path-info">
        <el-icon><IconMdiFolder /></el-icon>
        <el-tooltip :content="datasetPath" placement="top">
          <span class="path-text">{{ truncatedPath }}</span>
        </el-tooltip>
      </div>

      <!-- Загрузка списка файлов -->
      <div v-if="isLoadingFiles" class="loading-files">
        <el-icon class="is-loading"><IconMdiLoading /></el-icon>
        <span>Загрузка списка файлов...</span>
      </div>

      <!-- Ошибка загрузки -->
      <div v-else-if="loadError" class="load-error">
        <el-icon><IconMdiAlertCircle /></el-icon>
        <span>{{ loadError }}</span>
        <el-button size="small" @click="loadFiles">Повторить</el-button>
      </div>

      <!-- Нет файлов -->
      <div v-else-if="files.length === 0" class="no-files">
        <el-icon :size="32"><IconMdiFileQuestion /></el-icon>
        <span>Нет поддерживаемых файлов (.xyz, .las, .laz)</span>
      </div>

      <!-- Список файлов -->
      <div v-else class="files-list">
        <el-scrollbar max-height="200px">
          <div v-for="file in files" :key="file.path" class="file-item" @click="selectFile(file)">
            <el-icon class="file-icon">
              <IconMdiFileCloud />
            </el-icon>
            <span class="file-name">{{ file.name }}</span>
            <el-tag size="small" type="info">{{ file.extension }}</el-tag>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useVisualizerStore } from '@renderer/pages/visualizer/visualizerStore';
import { DatasetType, FileEntry } from '@renderer/pages/visualizer/vizualizerTypes';

const props = defineProps<{
  type: DatasetType;
  title: string;
  datasetPath: string;
}>();

const emit = defineEmits<{
  (e: 'file-selected', file: FileEntry): void;
}>();

const router = useRouter();
const visualizerStore = useVisualizerStore();

const files = ref<FileEntry[]>([]);
const isLoadingFiles = ref(false);
const loadError = ref<string | null>(null);

const truncatedPath = computed(() => {
  if (!props.datasetPath) return '';
  if (props.datasetPath.length > 40) {
    return '...' + props.datasetPath.slice(-37);
  }
  return props.datasetPath;
});

async function loadFiles() {
  if (!props.datasetPath) return;

  isLoadingFiles.value = true;
  loadError.value = null;

  try {
    const result = await window.api.readDirectory(props.datasetPath);
    if (result.success) {
      files.value = result.files;
    } else {
      loadError.value = result.error || 'Не удалось прочитать директорию';
    }
  } catch (err) {
    loadError.value = 'Ошибка при чтении директории';
    console.error(err);
  } finally {
    isLoadingFiles.value = false;
  }
}

function selectFile(file: FileEntry) {
  visualizerStore.setFile(file, props.type);
  emit('file-selected', file);
}

function goToSettings() {
  router.push('/settings/general');
}

onMounted(() => {
  if (props.datasetPath) {
    loadFiles();
  }
});

watch(
  () => props.datasetPath,
  (newPath) => {
    if (newPath) {
      loadFiles();
    } else {
      files.value = [];
    }
  }
);
</script>

<style lang="scss" scoped>
.dataset-picker {
  height: 100%;

  .card-header {
    display: flex;
    align-items: center;
    gap: 8px;

    .header-icon {
      color: var(--el-color-primary);
    }

    .header-title {
      flex: 1;
      font-weight: 500;
    }
  }

  .not-configured {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    text-align: center;

    .warning-icon {
      color: var(--el-color-warning);
      margin-bottom: 12px;
    }

    .warning-text {
      margin: 0 0 4px 0;
      font-weight: 500;
      color: var(--el-text-color-primary);
    }

    .warning-hint {
      margin: 0 0 16px 0;
      font-size: 12px;
      color: var(--el-text-color-secondary);
    }
  }

  .configured {
    .path-info {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--el-fill-color-light);
      border-radius: 4px;
      margin-bottom: 12px;
      font-size: 12px;
      color: var(--el-text-color-secondary);

      .path-text {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .loading-files,
    .load-error,
    .no-files {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 20px;
      color: var(--el-text-color-secondary);
      font-size: 13px;
    }

    .load-error {
      color: var(--el-color-danger);
    }

    .files-list {
      .file-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background: var(--el-fill-color);
        }

        .file-icon {
          color: var(--el-color-primary);
        }

        .file-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
