import { MenuItem } from '../types/menu'

export const visualizerMenu: MenuItem[] = [
  {
    index: '/visualizer/dashboard',
    title: 'Панель управления',
    icon: IconEpOdometer
  },
  {
    index: '/visualizer/charts',
    title: 'Графики',
    icon: IconEpTrendCharts
  },
  {
    index: '/visualizer/3d-view',
    title: '3D просмотр',
    icon: IconEpView
  },
  {
    index: '/visualizer/data-export',
    title: 'Экспорт данных',
    icon: IconEpDownload
  }
]
