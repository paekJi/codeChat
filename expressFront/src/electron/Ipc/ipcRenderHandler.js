const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  saveMessage: (messageInfo) => ipcRenderer.send('saveMessage', messageInfo),
  onMessageSaved: (callback) => ipcRenderer.on('saveMessage-reply', (event, response) => callback(response)),
  
  selectMessages: (roomId) => ipcRenderer.send('selectMessages', roomId),
  onMessagesSelected: (callback) => ipcRenderer.on('selectMessages-reply', (event, messages) => callback(messages)),
});