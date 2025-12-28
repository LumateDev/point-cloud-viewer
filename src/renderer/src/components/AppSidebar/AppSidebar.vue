<template>
  <aside
    class="sidebar"
    :class="{ 'sidebar--collapsed': isCollapsed }"
    :style="{ width: sidebarWidth }"
  >
    <header class="sidebar__header">
      <div v-if="!isCollapsed" class="sidebar__logo">
        <el-icon class="sidebar__logo-icon"><IconMdiCloudOutline /></el-icon>
        <span class="sidebar__logo-text">Point Cloud Viewer</span>
      </div>

      <button
        class="sidebar__toggle"
        :title="isCollapsed ? 'Развернуть' : 'Свернуть'"
        @click="toggleCollapse"
      >
        <el-icon :size="18">
          <IconMdiMenuOpen v-if="!isCollapsed" />
          <IconMdiMenuClose v-else />
        </el-icon>
      </button>
    </header>

    <el-scrollbar class="sidebar__scrollbar">
      <el-menu
        :default-active="activeRoute"
        :collapse="isCollapsed"
        :collapse-transition="false"
        class="sidebar__menu"
        router
      >
        <template v-for="item in menuConfig" :key="item.index">
          <!-- простой пункт -->
          <el-menu-item v-if="!item.children?.length" :index="item.index" :disabled="item.disabled">
            <el-icon v-if="item.icon">
              <component :is="item.icon" />
            </el-icon>
            <template #title>
              <span>{{ item.title }}</span>
              <el-badge v-if="item.badge" :value="item.badge" class="sidebar__badge" />
            </template>
          </el-menu-item>

          <!-- подменю -->
          <el-sub-menu v-else :index="item.index">
            <template #title>
              <el-icon v-if="item.icon">
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.title }}</span>
              <el-badge v-if="item.badge" :value="item.badge" class="sidebar__badge" />
            </template>

            <el-menu-item
              v-for="child in item.children"
              :key="child.index"
              :index="child.index"
              :disabled="child.disabled"
            >
              <el-icon v-if="child.icon">
                <component :is="child.icon" />
              </el-icon>
              <template #title>
                <span>{{ child.title }}</span>
                <el-badge v-if="child.badge" :value="child.badge" class="sidebar__badge" />
              </template>
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { menuConfig } from './layout/menu'

const route = useRoute()
const isCollapsed = ref(false)

const activeRoute = computed(() => route.path)
const sidebarWidth = computed(() => (isCollapsed.value ? '64px' : '240px'))

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}
</script>
<style lang="scss" scoped>
@use 'element-plus/theme-chalk/src/mixins/mixins' as *;

.sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--el-bg-color);
  border-right: 1px solid var(--el-border-color-light);
  transition: width 0.3s ease;

  /* ---------- header ---------- */
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 64px;
    flex-shrink: 0;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 12px;

    &-icon {
      font-size: 20px;
      color: var(--el-color-primary);
    }

    &-text {
      font-size: 16px;
      font-weight: 600;
      color: var(--el-text-color-primary);
      white-space: nowrap;
    }
  }

  /* ---------- toggle ---------- */
  &__toggle {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    color: var(--el-text-color-primary);
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: var(--el-fill-color-light);
    }

    &:active {
      background: var(--el-fill-color);
    }
  }

  /* ---------- menu ---------- */
  &__scrollbar {
    flex: 1;
    min-height: 0;
  }
  &__menu {
    border-right: none;
  }

  &__badge {
    margin-left: 8px;
  }

  /* ---------- collapsed ---------- */
  &--collapsed {
    .sidebar__logo-text {
      display: none;
    }

    .sidebar__menu {
      :deep(.el-sub-menu__title),
      :deep(.el-menu-item) {
        justify-content: center;
        padding: 0 16px;

        .el-icon {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
