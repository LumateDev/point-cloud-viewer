import type { Component } from 'vue';

export interface MenuItem {
  index: string;
  title: string;
  icon?: Component;
  children?: MenuItem[];
  badge?: number | string;
  disabled?: boolean;
  hidden?: boolean;
}

export interface SidebarMenuProps {
  collapsed?: boolean;
  defaultActive?: string;
  width?: string;
  collapsedWidth?: string;
}
