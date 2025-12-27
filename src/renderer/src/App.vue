<template>
  <div class="app-container">
    <el-header class="app-header">
      <h1 class="app-header__title">Point Cloud Viewer</h1>
      <AppTopMenu class="app-header__menu" />
    </el-header>
    <el-main class="app-main">
      <router-view />
    </el-main>
  </div>
</template>

<script setup lang="ts">
import AppTopMenu from './components/AppTopMenu/AppTopMenu.vue'
</script>

<style lang="scss" scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: var(--el-color-primary);
  color: var(--el-color-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;

  &__title {
    margin: 0;
    font-size: 1.5em;
  }

  &__menu {
    flex: 1;
    margin-left: 20px;
  }
}

.app-main {
  padding: 20px;
  overflow: auto;
  background-color: var(--el-bg-color-page);
}
</style>
