const Database = require("better-sqlite3");

let db;

/** connect to SQLite */
const connectToDb = (dbLocation) => {
  db = new Database(dbLocation, { verbose: console.log });
  
  /** table / index create */
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      roomId TEXT NOT NULL,
      userId TEXT NOT NULL,
      userName TEXT NOT NULL,
      content TEXT NOT NULL,
      type TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_roomIdx ON messages(roomId ASC);
  `);
  console.log("Connected to the SQLite database.");
};

/** disconnect to SQLite */
const disconnectToDB = () => {
  db.close();
  console.log("SQLite is disconnected");
};


/**insert message */
const insertMessage = (messageInfo) => {
  const sql = `INSERT INTO messages (roomId, userId, userName, content, type) 
                VALUES (?, ?, ?, ?, ?)`;
  const param = [messageInfo.roomId, messageInfo.userId, messageInfo.userName, messageInfo.content, ""];

  try {
    db.prepare(sql).run(param);
    return true;
  } catch (err) {
    console.error("Error inserting message:", err);
    return false;
  }
};

/** select room message */
const selectMessage = (roomId) => {
  const sql = `SELECT roomId, userId, userName, content, type, timestamp 
               FROM messages 
               WHERE roomId = ?
               ORDER BY timestamp ASC`;
  const param = [roomId];

  try {
    const rows = db.prepare(sql).all(param);
    return rows;
  } catch (err) {
    console.error("Error selecting messages:", err);
    return [];
  }
};

module.exports = {
  connectToDb,
  disconnectToDB,
  insertMessage,
  selectMessage,
};
