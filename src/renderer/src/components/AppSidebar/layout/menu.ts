import { MenuItem } from '../types/menu'
import { settingsMenu } from './settings'
import { tab1Menu } from './tab1'
import { tab2Menu } from './tab2'
import { visualizerMenu } from './visualizer'

export const menuConfig: MenuItem[] = [
  {
    index: '/visualizer',
    title: 'Визуализатор',
    icon: IconMdiCloudOutline,
    children: visualizerMenu
  },
  {
    index: '/tab1',
    title: 'Вкладка 1',
    icon: IconEpDocument,
    children: tab1Menu
  },
  {
    index: '/tab2',
    title: 'Вкладка 2',
    icon: IconEpGrid,
    children: tab2Menu
  },
  {
    index: '/settings',
    title: 'Настройки',
    icon: IconEpSetting,
    children: settingsMenu
  },
  {
    index: '/about',
    title: 'О программе',
    icon: IconEpInfoFilled
  }
]

export * from './visualizer'
export * from './tab1'
export * from './tab2'
export * from './settings'
