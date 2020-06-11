const sqlite3 = require("sqlite3").verbose();
const dbName = "main.db";

let db = new sqlite3.Database(dbName, (err) => {
    if (err) throw err;
    console.log("Database started on " + dbName);
    /*
    db.run(
        "CREATE TABLE questions_base(id INT PRIMARY KEY NOT NULL, question VARCHAR(255))"
    );
    */

    /*
    db.run(
        `INSERT INTO questions_base(id, question) VALUES(3,  "Comment s'appelle ton chien ?")`
    );
    */

    db.all("SELECT * FROM questions_base", (err, data) => {
        if (err) throw err;
        console.log(data);
    });
});

db.close((err) => {
    if (err) throw err;
    console.log("Database closed");
});
