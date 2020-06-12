const sqlite3 = require("sqlite3").verbose();
const dbName = "main.db";

const allSqlColumnsNames = [
    "id",
    "question",
    "category",
    "type",
    "difficulty",
    "correct_answer",
    "incorrect_answers",
];

let db = new sqlite3.Database(dbName, (err) => {
    if (err) throw err;

    db.run(
        "CREATE TABLE IF NOT EXISTS questions_base (id INTEGER PRIMARY KEY, question VARCHAR(255), category VARCHAR(255), 'type' VARCHAR(255), difficulty VARCHAR(255), correct_answer VARCHAR(255), incorrect_answers VARCHAR(255));"
    );

    db.close((err) => {
        if (err) throw err;
    });
});

exports.findAll = (req, res) => {
    let db = new sqlite3.Database(dbName, (err) => {
        if (err) throw err;

        db.all("SELECT * FROM questions_base", (err, data) => {
            if (err) throw err;
            res.send(data);
        });

        db.close((err) => {
            if (err) throw err;
        });
    });
};

exports.findQuestionById = (req, res) => {
    const urlId = req.params.id;

    let db = new sqlite3.Database(dbName, (err) => {
        if (err) throw err;

        db.get(
            "SELECT * FROM questions_base WHERE id = " + urlId,
            (err, data) => {
                if (err) throw err;
                res.send(data);
            }
        );

        db.close((err) => {
            if (err) throw err;
        });
    });
};

exports.postQuestions = (req, res) => {
    const urlId = req.params.id;
    const bodyReceived = req.body;

    let db = new sqlite3.Database(dbName, (err) => {
        if (err) throw err;

        db.get(
            "SELECT * FROM questions_base WHERE id = '" + urlId + "'",
            (err, data) => {
                if (err) throw err;

                if (data) {
                    /* UPDATE datas if exists */
                    for (const property in bodyReceived) {
                        if (allSqlColumnsNames.includes(property)) {
                            //keys received exists in the db columns
                            const sqlUpdateQuery =
                                "UPDATE questions_base SET " +
                                property +
                                " = '" +
                                bodyReceived[property] +
                                "' WHERE id = '" +
                                urlId +
                                "'";

                            db.run(sqlUpdateQuery);
                            console.log("UPDATED");
                            res.status(202).send("object updated");
                        } else {
                            res.status(400).send("unknown key sent");
                        }
                    }
                } else {
                    /* INSERT datas if dont' exists */
                    const keysNewObjectReceived = [];
                    const valuesNewObjectReceived = [];

                    for (const property in bodyReceived) {
                        //foreach attributs in the object received
                        if (allSqlColumnsNames.includes(property)) {
                            //keys received exists in the db columns
                            keysNewObjectReceived.push(property);
                            valuesNewObjectReceived.push(
                                "'" + bodyReceived[property] + "'"
                            );
                        } else {
                            res.status(400).send("unknown key sent");
                            return;
                        }
                    }

                    const SqlInsertObjectQuery =
                        "INSERT INTO questions_base (id," +
                        keysNewObjectReceived +
                        ") VALUES ('" +
                        urlId +
                        "'," +
                        valuesNewObjectReceived +
                        ")";
                    console.log("go fuck yourself");
                    db.run(SqlInsertObjectQuery);
                    res.status(201).send("Object created");
                }
            }
        );

        db.close((err) => {
            if (err) throw err;
        });
    });
};
