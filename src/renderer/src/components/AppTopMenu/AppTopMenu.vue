<template>
  <el-menu :default-active="$route.path" class="app-top-menu" mode="horizontal" :router="true">
    <el-menu-item index="/visualizer" class="app-top-menu__item"> Визуализатор </el-menu-item>
    <el-menu-item index="/tab1" class="app-top-menu__item"> Вкладка 1 </el-menu-item>s
    <el-menu-item index="/tab2" class="app-top-menu__item"> Вкладка 2 </el-menu-item>
    <el-menu-item index="/settings" class="app-top-menu__item"> Настройки </el-menu-item>
    <el-menu-item index="/about" class="app-top-menu__item"> О программе </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app-top-menu {
  border-bottom: none;
}
</style>
