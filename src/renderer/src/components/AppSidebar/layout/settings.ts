import { MenuItem } from '../types/menu'

export const settingsMenu: MenuItem[] = [
  {
    index: '/settings/general',
    title: 'Общие',
    icon: IconEpTools
  },
  {
    index: '/settings/network',
    title: 'Сеть',
    icon: IconEpConnection
  },
  {
    index: '/settings/hotkeys',
    title: 'Горячие клавиши',
    icon: IconMdiKeyboard
  },
  {
    index: '/settings/appearance',
    title: 'Внешний вид',
    icon: IconEpBrush
  }
]
