const { app, Menu, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
// const app = electron.app || require('app');
// const BrowserWindow = electron.BrowserWindow || require('broubrowser-window');
const path = require('path');
const url = require('url');
const jsonServer = require('json-server');

const server = jsonServer.create();

const route = jsonServer.router('db.json');

server.use(jsonServer.defaults());
server.use(route);

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({ 
    width: 1200,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  mainWindow.loadURL(`http://localhost:7000/index.html`);

  // 開発ツールを有効化
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  server.listen(7000, () => {
    write('run json server');
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    mainWindow = null;
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const write = (message) => {
  mainWindow.webContents.send('writeLog', message);
}

