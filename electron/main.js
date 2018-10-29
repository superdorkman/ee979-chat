const { app, BrowserWindow, globalShortcut, ipcMain, Menu, Tray, nativeImage } = require('electron');
const log = require('electron-log');
const { autoUpdater } = require("electron-updater");
const path = require('path');
const url = require('url');
const fs = require('fs');

let tray = null;

let isLoggedIn = false;
let curWin = null;

const startUrl = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '/../build/index.html'),
  protocol: 'file:',
  slashes: true
});

app.on('ready', createLoginWin);

app.on('window-all-closed', () => {
  // app.quit();
});

function createLoginWin() {
  curWin = new BrowserWindow(
    {
      width: 428,
      height: 328,
      frame: false,
      icon: path.join(__dirname, '/../public/assets/images/logo.png'),
      skipTaskbar: true,
      webPreferences: {
        devTools: true
      }
    }
  );

  globalShortcut.register('F5', () => {
    // console.log('f5 pressed');
    curWin.loadURL(startUrl);
  });

  ipcMain.on('loginWin:extract', (event) => {
    curWin.minimize();
  });

  ipcMain.on('loginWin:close', (event) => {
    curWin.close();
    app.quit();
  });

  ipcMain.on('auth:check', (event) => {
    event.returnValue = isLoggedIn;
  });
  
  curWin.loadURL(startUrl);

  // curWin.webContents.openDevTools({mode: 'detach'});
  setTray();

  ipcMain.on('auth:login', (event) => {
    isLoggedIn = true;
    curWin.close();
    curWin = null;
    createChatWin();
  });
}

function createChatWin() {
  if (curWin) return;
  
  curWin = new BrowserWindow(
    {
      minWidth: 1208,
      minHeight: 796,
      frame: false,
      icon: path.join(__dirname, 'assets/images/logo.png'),
      webPreferences: {
        devTools: true
      }
    }
  );
  // curWin = mainWin;
  
  curWin.loadURL(startUrl);
  
  ipcMain.on('auth:check', (event) => {
    event.returnValue = isLoggedIn;
  });

  const iconPath = path.join(__dirname, 'assets/images/logo.png');
  let trayIcon = nativeImage.createFromPath(iconPath);
  trayIcon = trayIcon.resize({ width: 16, height: 16 });
  tray.setImage(trayIcon);

  setWinEvents();

  ipcMain.on('app:extract', (event) => {
    curWin.minimize();
  });

  ipcMain.on('app:hide', (event) => {
    curWin.hide();
  });

  ipcMain.on('app:expand', (event) => {
    if (curWin.isMaximized()) {
      curWin.unmaximize();
    } else {
      curWin.maximize();
    }
  });

  ipcMain.on('message:arrive', (event, message) => {
    // console.log(message);
    notifyUser();
  });
}

function notifyUser() {
  const isVisible = mainWin.isVisible();  // 是否托盘中
  const isFocused = mainWin.isFocused();  // 是否当前选中
  console.log(isVisible, isFocused);
  if (!isFocused) {
    if (isVisible) {
      curWin.flashFrame(true);
    } else {
      // console.log('should blink the tray')
    }
  }
}

function setTray() {
  const iconPath = path.join(__dirname, 'assets/images/logogray.png');
  let trayIcon = nativeImage.createFromPath(iconPath);
  trayIcon = trayIcon.resize({ width: 16, height: 16 });
  tray = new Tray(trayIcon);
  // const contextMenu = Menu.buildFromTemplate([
  //   {role: 'quit', label: '退出程序'},
  // ])
  // tray.setToolTip('易易在线聊天系统');
  // tray.setContextMenu(contextMenu);

  // tray.on('click', () => {
  //   curWin.show();
  // });
}

function setWinEvents() {
  // mainWin.on('resize', (e) => {
  //   console.log(e)
  // });
}

//-------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

function sendStatusToWindow(text) {
  log.info(text);
  // win.webContents.send('message', text);
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
app.on('ready', function () {
  autoUpdater.checkForUpdatesAndNotify();
});

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
