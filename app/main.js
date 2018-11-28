const {app, BrowserWindow, ipcMain, Menu } = require ('electron');
let mainWindow = null;

const menuTemplate = [{
  label: 'Archivo'
}];

app.on('ready', () => {
  mainWindow = new BrowserWindow({ show: false });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

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
