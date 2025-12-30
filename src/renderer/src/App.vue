<template>
  <el-config-provider :locale="ru">
    <div class="app">
      <AppSidebar />
      <main class="app__main">
        <router-view />
      </main>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import ru from 'element-plus/es/locale/lang/ru';
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  min-height: 100vh;

  &__main {
    flex: 1;
    overflow: auto;
  }
}
</style>
