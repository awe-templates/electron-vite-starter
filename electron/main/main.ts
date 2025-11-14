import { app, BrowserWindow } from 'electron';
import '@main/ipc';
import { createMainWindow } from '@main/window';
import { setupMenu } from '@main/menu';

let mainWindow: BrowserWindow | null = null;

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  mainWindow = createMainWindow();
  setupMenu();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createMainWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

// Security: Limit navigation
app.on('web-contents-created', (_event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    // Only allow navigation to localhost in development
    if (process.env.ELECTRON_IS_DEV) {
      if (parsedUrl.origin !== 'http://localhost:5173') {
        event.preventDefault();
      }
    } else {
      // In production, prevent all navigation
      event.preventDefault();
    }
  });

  // Security: Prevent new window creation
  contents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });
});
