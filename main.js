const { app, BrowserWindow, globalShortcut, ipcMain, Menu, Tray } = require('electron');
const log = require('electron-log');
const { autoUpdater } = require("electron-updater");
const path = require('path');

let loginWin = null;
let mainWin = null;
let tray = null;
let isLoggedIn = false;
let curWin = null;

app.on('ready', createLoginWin);

app.on('window-all-closed', () => {
  // app.quit();
});

function createLoginWin() {
  loginWin = new BrowserWindow(
    {
      width: 428,
      height: 328,
      frame: false,
      icon: path.join(__dirname, 'public/assets/images/logo.png'),
      skipTaskbar: true,
    }
  );
  curWin = loginWin;

  setTray();

  ipcMain.on('loginWin:extract', (event) => {
    loginWin.minimize();
  });

  ipcMain.on('loginWin:close', (event) => {
    loginWin.close();
    app.quit();
  });

  ipcMain.on('auth:check', (event) => {
    event.returnValue = isLoggedIn;
  });
  
  // loginWin.webContents.loadURL('http://192.168.2.102:3000');
  loginWin.webContents.loadURL(`file://${__dirname}/build/index.html`);
  ipcMain.on('auth:login', (event) => {
    isLoggedIn = true;
    loginWin.close();
    createChatWin();
  });
}

function createChatWin() {
  if (mainWin) return;
  
  mainWin = new BrowserWindow(
    {
      minWidth: 1208,
      minHeight: 796,
      frame: false,
      icon: path.join(__dirname, 'assets/images/logo.png'),
    }
  );
  curWin = mainWin;
  // mainWin.webContents.loadURL('http://192.168.2.102:3000');
  mainWin.webContents.loadURL(`file://${__dirname}/build/index.html`);

  globalShortcut.register('F5', () => {
    // console.log('f5 pressed');
    // mainWin.webContents.loadURL('http://192.168.2.102:3000');
    mainWin.webContents.loadURL(`file://${__dirname}/build/index.html`);
  })
  
  ipcMain.on('auth:check', (event) => {
    event.returnValue = isLoggedIn;
  });

  setTray();
  setWinEvents();

  ipcMain.on('app:extract', (event) => {
    mainWin.minimize();
  });

  ipcMain.on('app:hide', (event) => {
    mainWin.hide();
  });

  ipcMain.on('app:expand', (event) => {
    if (mainWin.isMaximized()) {
      mainWin.unmaximize();
    } else {
      mainWin.maximize();
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
      mainWin.flashFrame(true);
    } else {
      // console.log('should blink the tray')
    }
  }
}

function setTray() {
  if (isLoggedIn) {
    tray.setImage(path.join(__dirname, 'public/assets/images/logo.png'));
  } else {
    tray = new Tray(path.join(__dirname, 'public/assets/images/logo-gray.png'));
    const contextMenu = Menu.buildFromTemplate([
      {role: 'quit', label: '退出程序'},
    ])
    tray.setToolTip('易易在线聊天系统');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
      // loginWin.isVisible() ? loginWin.hide() : loginWin.show();
      curWin.show();
    });
  }
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


app.on('window-all-closed', () => {
  app.quit();
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
