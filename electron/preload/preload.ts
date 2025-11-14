import { contextBridge, ipcRenderer } from 'electron';
import { createClient } from '@egoist/tipc/renderer';
import type { AppRouter } from '@shared/ipc';

console.log('[Preload] Script started');

// Create type-safe IPC client
const api = createClient<AppRouter>({
  ipcInvoke: ipcRenderer.invoke.bind(ipcRenderer),
});

console.log('[Preload] API client created:', !!api);

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Expose the type-safe API client
  api,

  // Additional platform info
  platform: process.platform,
});

console.log('[Preload] electronAPI exposed to main world');

// Type definitions for renderer process
export type ElectronAPI = {
  api: ReturnType<typeof createClient<AppRouter>>;
  platform: NodeJS.Platform;
};

// Declare global window interface extension
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
