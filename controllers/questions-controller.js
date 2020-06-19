const sqlite3 = require("sqlite3").verbose();
var Sequelize = require("sequelize");
const { DATE } = require("sequelize");
const dbName = "main.db";

let db = new sqlite3.Database(dbName, (err) => {
    if (err) throw err;
    console.log("main.db created");
});

var connection = new Sequelize(dbName, "root", "", {
    dialect: "sqlite",
    storage: "./" + dbName,
    host: "localhost",
});

var Questions = connection.define("questions_bases", {
    question: Sequelize.STRING,
    category: Sequelize.STRING,
    type: Sequelize.STRING,
    difficulty: Sequelize.STRING,
    correct_answer: Sequelize.STRING,
    incorrect_answers: Sequelize.STRING,
});
Questions.sync();

exports.findAll = (req, res) => {
    const limit = (req.query.limit || 100) * 1; // $get "limit" parameter in the URL
    const page = (req.query.page || 0) * 1; // $get "page" parameter in the URL
    const offset = (page - 1) * limit;

    Questions.findAll({
        offset: offset,
        limit: limit,
    })
        .then((results) => res.header('Access-Control-Allow-Origin', '*').send(results))
        .catch((error) => console.log(error));
    //.finally(() => connection.close());
};

exports.findQuestionById = (req, res) => {
    const urlId = req.params.id;

    Questions.findOne({
        limit: 1,
        where: {
            id: urlId,
        },
    })
        .then((results) => res.send(results))
        .catch((error) => console.log(error));
};

exports.postQuestions = async (req, res, error) => {
    const urlId = req.params.id;
    const bodyReceived = req.body;

    var PostStructure = require("./PostStructure");

    try {
        await Questions.upsert(
            PostStructure.createStructureObject(urlId, bodyReceived)
        );
        res.status(201).send("success");
    } catch (error) {
        console.log(error);
    }
};
