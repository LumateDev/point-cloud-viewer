import { defineStore } from 'pinia';
import { useStorage, useTitle } from '@vueuse/core';
import { computed, watch } from 'vue';

type Theme = 'light' | 'dark';

export const useAppStore = defineStore('app', () => {
  const APP_TITLE = 'Point Cloud Viewer';

  const theme = useStorage<Theme>('app-theme', 'light');
  const sidebarCollapsed = useStorage<boolean>('sidebar-collapsed', false);
  const isDevMode = useStorage<boolean>('app-dev-mode', false);

  const computedTitle = computed(() => {
    const suffix = isDevMode.value ? ' [DEV MODE]' : '';
    return `${APP_TITLE}${suffix}`;
  });

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
  };

  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
  };

  watch(
    theme,
    (val) => {
      if (val === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    { immediate: true }
  );

  useTitle(computedTitle);

  return {
    theme,
    sidebarCollapsed,
    isDevMode,
    setTheme,
    toggleSidebar,
  };
});
