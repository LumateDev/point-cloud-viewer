import { ElectronAPI } from '@electron-toolkit/preload';

export interface ReadDirectoryResult {
  success: boolean;
  files: FileEntry[];
  error?: string;
}

export interface Api {
  openDirectoryDialog: (options: { title: string }) => Promise<Electron.OpenDialogReturnValue>;
  openFileDialog: (options: {
    title?: string;
    filters?: Electron.FileFilter[];
    defaultPath?: string;
  }) => Promise<Electron.OpenDialogReturnValue>;
  readDirectory: (dirPath: string) => Promise<ReadDirectoryResult>;
}

declare global {
  interface Window {
    electron: ElectronAPI;
    api: Api;
  }
}
