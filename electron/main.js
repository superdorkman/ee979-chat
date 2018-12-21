const { app, BrowserWindow, globalShortcut, ipcMain, Menu, Tray, nativeImage } = require('electron');
const { autoUpdater } = require("electron-updater");
const path = require('path');
const url = require('url');

let tray = null;

let isLoggedIn = false;
let win = null;

const startUrl = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '/../build/index.html'),
  protocol: 'file:',
  slashes: true
});
// const startUrl = '192.168.2.106:3000';

app.on('ready', createLoginWin);

app.on('will-quit', () => {
  // 清空所有快捷键
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
  // app.quit();
});

function createLoginWin() {
  win = new BrowserWindow(
    {
      width: 428,
      height: 328,
      frame: false,
      icon: path.join(__dirname, 'logo.png'),
      skipTaskbar: true,
      // webPreferences: {
      //   devTools: true
      // }
    }
  );

  globalShortcut.register('F5', () => {
    // console.log('f5 pressed');
    win.loadURL(startUrl);
  });

  ipcMain.on('app:extract', (event) => {
    win.minimize();
  });

  ipcMain.on('app:hide', (event) => {
    win.hide();
  });

  ipcMain.on('app:close', (event) => {
    win.close();
    app.quit();
  });

  ipcMain.on('auth:check', (event) => {
    event.returnValue = isLoggedIn;
  });
  
  win.loadURL(startUrl);

  win.webContents.openDevTools({mode: 'detach'});

  setTray();
  
  ipcMain.on('auth:login', (event) => {
    isLoggedIn = true;
    prepareChatWin();
  });
}


function prepareChatWin() {
  // console.log(win.getBounds())
  const { width: sw, height: sh } = require('electron').screen.getPrimaryDisplay().workAreaSize;
  win.setSkipTaskbar(false);
  win.loadURL(startUrl);
  const _x = (sw - 1208) / 2;
  const _y = (sh - 796) / 2;
  win.setBounds({
    x: 100,
    y: 20,
    width: 1208,
    height: 796,
  }, true);
  // win.setSize(1208, 796, true);
  
  const iconPath = path.join(__dirname, 'logo.png');
  let trayIcon = nativeImage.createFromPath(iconPath);
  trayIcon = trayIcon.resize({ width: 16, height: 16 });
  tray.setImage(trayIcon);

  ipcMain.on('app:expand', (event) => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  ipcMain.on('message:arrive', (event, message) => {
    notifyUser();
  });

  // win.webContents.openDevTools({mode: 'detach'});

  // 检查更新
  autoUpdater.checkForUpdatesAndNotify();
}


function notifyUser() {
  const isVisible = win.isVisible();  // 是否托盘中
  const isFocused = win.isFocused();  // 是否当前选中
  // console.log(isVisible, isFocused);
  if (!isFocused) {
    if (isVisible) {
      win.flashFrame(true);
    } else {
      // console.log('should blink the tray')
    }
  }
}

function setTray() {
  const iconPath = path.join(__dirname, 'logogray.png');
  let trayIcon = nativeImage.createFromPath(iconPath);
  trayIcon = trayIcon.resize({ width: 16, height: 16 });
  tray = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate([
    {label: '显示窗口', click: () => {
      win.show();
    }},
    {role: 'quit', label: '退出程序'},
  ])
  tray.setToolTip('易易在线聊天系统');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    win.show();
  });
}

function setWinEvents() {
  
}

// 升级通信
function sendStatusToWindow(text) {
  win.webContents.send('update', text);
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
});

// Auto updates - Option 1 - Simplest version
// This will immediately download an update, then install when the app quits.
// app.on('ready', function () {
//   autoUpdater.checkForUpdatesAndNotify();
// });

// Auto updates - Option 2 - More control
// The app doesn't need to listen to any events except `update-downloaded`
// Uncomment any of the below events to listen for them.  Also,
// look in the previous section to see them being used.
//-------------------------------------------------------------------
// app.on('ready', function()  {
//   autoUpdater.checkForUpdates();
// });
// autoUpdater.on('checking-for-update', () => {
// })
// autoUpdater.on('update-available', (info) => {
// })
// autoUpdater.on('update-not-available', (info) => {
// })
// autoUpdater.on('error', (err) => {
// })
// autoUpdater.on('download-progress', (progressObj) => {
// })
// autoUpdater.on('update-downloaded', (info) => {
//   autoUpdater.quitAndInstall();  
// })
