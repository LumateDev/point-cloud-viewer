import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

const api = {
  openDirectoryDialog: (options: { title: string }) => ipcRenderer.invoke('open-directory-dialog', options),
  openFileDialog: (options: { title?: string; filters?: Electron.FileFilter[]; defaultPath?: string }) =>
    ipcRenderer.invoke('open-file-dialog', options),

  readDirectory: (dirPath: string) => ipcRenderer.invoke('read-directory', dirPath),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
