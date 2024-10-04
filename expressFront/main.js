const { app, BrowserWindow } = require("electron");
const path = require("path");
const sqlliteDb = require("./src/sqlLite/sqllite"); 

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, 
    },
  });
  win.loadURL("http://localhost:3000");
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  sqlliteDb.connectToDb("./database.db");
  createWindow();
});


app.on("will-quit",(e)=>{
    sqlliteDb.disconnectToDB();
});