const {app, BrowserWindow} = require ('electron');
let mainWindow = null;
if (process.platform === 'linux') {
  app.disableHardwareAcceleration();
}

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  //mainWindow.webContents.loadFile('file://' + __dirname + '/index.html');
  //mainWindow.webContents.loadFile('index.html');
  mainWindow.webContents.loadFile('./index.html');
})
