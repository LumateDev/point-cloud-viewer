<template>
  <div class="point-cloud-viewer">
    <!-- Toolbar -->
    <div class="viewer-toolbar">
      <div class="toolbar-left">
        <el-button-group>
          <el-tooltip content="Сбросить камеру" placement="bottom">
            <el-button>
              <el-icon>
                <IconMdiCameraFlip />
              </el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="Вид сверху" placement="bottom">
            <el-button>
              <el-icon>
                <IconMdiAxisZArrow />
              </el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="Вид сбоку" placement="bottom">
            <el-button>
              <el-icon>
                <IconMdiAxisXArrow />
              </el-icon>
            </el-button>
          </el-tooltip>
        </el-button-group>

        <el-divider direction="vertical" />

        <el-button-group>
          <el-tooltip content="Увеличить" placement="bottom">
            <el-button>
              <el-icon>
                <IconMdiMagnifyPlus />
              </el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip content="Уменьшить" placement="bottom">
            <el-button>
              <el-icon>
                <IconMdiMagnifyMinus />
              </el-icon>
            </el-button>
          </el-tooltip>
        </el-button-group>
      </div>

      <div class="toolbar-right">
        <el-tooltip content="Закрыть файл" placement="bottom">
          <el-button type="danger" plain @click="closeFile">
            <el-icon><IconMdiClose /></el-icon>
            Закрыть
          </el-button>
        </el-tooltip>
      </div>
    </div>

    <!-- Canvas -->
    <div ref="canvasContainer" class="canvas-container">
      <!-- Three.js будет рендериться здесь -->
      <div class="placeholder">
        <el-icon :size="64"><IconMdiCubeOutline /></el-icon>
        <p>Загрузка визуализатора...</p>
        <p class="file-info">{{ visualizerStore.fileName }}</p>
      </div>
    </div>

    <!-- Bottom Panel -->
    <div class="viewer-bottom-panel">
      <div class="panel-left">
        <el-tag type="info">
          <el-icon><IconMdiFileCloud /></el-icon>
          {{ visualizerStore.loadedFile?.format?.toUpperCase() }}
        </el-tag>
        <span class="file-name">{{ visualizerStore.fileName }}</span>
      </div>

      <div class="panel-center">
        <!-- Легенда будет здесь -->
      </div>

      <div class="panel-right">
        <span v-if="visualizerStore.stats" class="stats-info">
          <el-icon><IconMdiChartScatterPlot /></el-icon>
          {{ formatNumber(visualizerStore.stats.pointCount) }} точек
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVisualizerStore } from '@renderer/pages/visualizer/visualizerStore';

const visualizerStore = useVisualizerStore();

function closeFile() {
  visualizerStore.clearFile();
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('ru-RU').format(num);
}
</script>

<style lang="scss" scoped>
.point-cloud-viewer {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--el-bg-color);
  border-radius: 8px;
  overflow: hidden;

  .viewer-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: var(--el-bg-color-page);
    border-bottom: 1px solid var(--el-border-color-light);

    .toolbar-left,
    .toolbar-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .canvas-container {
    flex: 1;
    position: relative;
    background: #1a1a2e;

    .placeholder {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: rgba(255, 255, 255, 0.5);

      p {
        margin: 8px 0 0;
      }

      .file-info {
        font-size: 12px;
        opacity: 0.7;
      }
    }
  }

  .viewer-bottom-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: var(--el-bg-color-page);
    border-top: 1px solid var(--el-border-color-light);
    font-size: 12px;

    .panel-left {
      display: flex;
      align-items: center;
      gap: 8px;

      .file-name {
        color: var(--el-text-color-secondary);
      }
    }

    .panel-right {
      .stats-info {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>
