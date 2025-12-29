<template>
  <div class="app">
    <AppSidebar />
    <main class="app__main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app {
  display: flex;
  min-height: 100vh;

  &__main {
    flex: 1;
    overflow: auto;
    padding: 20px;
  }
}
</style>
