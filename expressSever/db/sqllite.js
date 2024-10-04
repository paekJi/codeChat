const sqlite3 = require("sqlite3").verbose();


/**connect to sqllite */
module.exports = (dbLocation) => {
 const db = new sqlite3.Database(dbLocation, (err) => {
   if (err) {
     console.error(err.message);
   } else {
     console.log("Connected to the SQLite database.");
   }
 });


 /** table / index create  */
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        roomId TEXT NOT NULL,
        sender TEXT NOT NULL,
        content TEXT NOT NULL,
        type TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE INDEX IF NOT EXISTS idx_roomIdx ON messages(roomId ASC)`);
});
}



