const { app, BrowserWindow } = require ('electron');

function createWindow(config, fileName) {
    const window = new BrowserWindow(config);
    window.loadURL(`file://${__dirname}/${fileName}.html`);
    return window;
};

module.exports = {    
    getMenu: function() { 
        return [{
            label: 'Archivo',
            submenu: [{
                label: 'Salir',
                accelerator: 'Ctrl+S',
                click() {
                    app.quit();
                }
            }]
            },{
                label: 'Proveedores',
                submenu: [{
                    label: 'Nuevo',
                    click() {
                        createWindow({
                            title: 'Nuevo Proveedor',
                            width: 300,
                            height: 300
                        }, 'nuevoProveedor');
                    }
                }, {
                    label: 'Buscar'
                }]
            },
            {
                label: 'Inventario',
                submenu: [{
                label: 'Nuevo'
                }, {
                label: 'Buscar'
            }]
        }];
    }
};