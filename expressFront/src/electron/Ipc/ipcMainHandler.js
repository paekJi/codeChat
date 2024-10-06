const { ipcMain } = require('electron');
const sqlliteDb = require('../sqlLite/sqllite');

const setupIpcHandlers = () => {
  ipcMain.on("saveMessage", (e, messageInfo) => {
    console.log(messageInfo);
    const res = sqlliteDb.insertMessage(messageInfo);
    e.sender.send("saveMessage-reply", res);
  });

  ipcMain.on("selectMessages", (e, roomId) => {
    const messages = sqlliteDb.selectMessage(roomId);
    e.sender.send("selectMessage-reply", messages);
  });
};

module.exports = setupIpcHandlers;