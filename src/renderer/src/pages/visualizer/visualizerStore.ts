import { defineStore } from 'pinia';
import { DatasetType, LoadedFile, PointCloudFormat, PointCloudStats } from '@renderer/pages/visualizer/vizualizerTypes';

export const useVisualizerStore = defineStore('visualizer', () => {
  const loadedFile = ref<LoadedFile | null>(null);
  const isLoading = ref(false);
  const loadingProgress = ref(0);
  const error = ref<string | null>(null);
  const stats = ref<PointCloudStats | null>(null);

  const hasContent = computed(() => loadedFile.value !== null);

  const fileExtension = computed(() => {
    if (!loadedFile.value) return null;
    return loadedFile.value.format;
  });

  const fileName = computed(() => loadedFile.value?.name ?? '');

  function getFormatFromPath(filePath: string): PointCloudFormat {
    const ext = filePath.split('.').pop()?.toLowerCase();
    if (ext === 'xyz') return 'xyz';
    if (ext === 'las') return 'las';
    if (ext === 'laz') return 'laz';
    return null;
  }

  function setFile(file: { name: string; path: string }, sourceType: DatasetType) {
    const format = getFormatFromPath(file.path);

    if (!format) {
      error.value = 'Неподдерживаемый формат файла. Поддерживаются: .xyz, .las, .laz';
      return false;
    }

    loadedFile.value = {
      name: file.name,
      path: file.path,
      format,
      sourceType,
    };
    error.value = null;
    return true;
  }

  function clearFile() {
    loadedFile.value = null;
    stats.value = null;
    error.value = null;
    loadingProgress.value = 0;
  }

  function setLoading(loading: boolean, progress = 0) {
    isLoading.value = loading;
    loadingProgress.value = progress;
  }

  function setError(errorMessage: string | null) {
    error.value = errorMessage;
  }

  function setStats(newStats: PointCloudStats) {
    stats.value = newStats;
  }

  return {
    loadedFile,
    isLoading,
    loadingProgress,
    error,
    stats,

    hasContent,
    fileExtension,
    fileName,

    setFile,
    clearFile,
    setLoading,
    setError,
    setStats,
    getFormatFromPath,
  };
});
