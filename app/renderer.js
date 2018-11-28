const electron = require("electron");
const { ipcRenderer } = electron;

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const txtName = document.getElementById("#txtName");
    
    ipcRenderer.send("user:submit", { name: txtName.value });
});

ipcRenderer.on("user:saved", (event, user) => {
    alert(JSON.stringify(user));
});