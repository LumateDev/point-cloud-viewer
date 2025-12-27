<template>
  <div class="page-container">
    <h2>Визуализатор Облака Точек</h2>
    <p>
      Здесь будет реализована логика отображения .las/.laz/.xyz файлов с использованием Three.js.
    </p>
    <div id="threejs-container" class="threejs-container">
      <!-- Canvas Three.js будет создан здесь -->
    </div>
  </div>
</template>

<script setup lang="ts">
// Логика для загрузки и отображения облака точек будет добавлена позже
</script>

<style lang="scss" scoped>
.page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.threejs-container {
  flex: 1;
  border: 1px solid #dcdfe6;
  background-color: #000;
  border-radius: 4px;
  margin-top: 10px;
}
</style>
