import { ElectronAPI } from '@electron-toolkit/preload';

export interface Api {
  openDirectoryDialog: (options: { title: string }) => Promise<Electron.OpenDialogReturnValue>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
    api: Api;
  }
}
