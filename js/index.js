const electron = require('electron');
const renderer = electron.ipcRenderer;
const logs = document.getElementById('custom-routes');

renderer.on('writeLog', (ev, message) => {
  const text = logs.innerText + '<br />' + message;
  logs.innerText = text;
})

