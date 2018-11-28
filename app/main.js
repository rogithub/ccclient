const {app, BrowserWindow, ipcMain } = require ('electron');
let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ show: false });

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

ipcMain.on("user:submit", (event, user) => {
  user["id"] = 1;
  mainWindow.webContents.send("user:saved", user);  
});