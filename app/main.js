const { app, BrowserWindow, ipcMain, Menu } = require ('electron');
const menuBuilder = require ('./menu');
let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ show: false });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  const mainMenu = Menu.buildFromTemplate(menuBuilder.getMenu());
  Menu.setApplicationMenu(mainMenu);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });
});

ipcMain.on("user:submit", (event, user) => {
  user["id"] = 1;
  mainWindow.webContents.send("user:saved", user);  
});
