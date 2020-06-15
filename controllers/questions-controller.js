const sqlite3 = require("sqlite3").verbose();
var Sequelize = require("sequelize");
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

var connection = new Sequelize(dbName, "root", "", {
    dialect: "sqlite",
    storage: "../" + dbName,
    host: "localhost",
});

var Questions = connection.define("questions_base", {
    question: Sequelize.STRING,
    category: Sequelize.STRING,
    type: Sequelize.STRING,
    difficulty: Sequelize.STRING,
    correct_answer: Sequelize.STRING,
    incorrect_answers: Sequelize.STRING,
});

exports.findAll = (req, res) => {
    const limit = (req.query.limit || 100) * 1; // $get "limit" parameter in the URL
    const page = (req.query.page || 0) * 1; // $get "page" parameter in the URL
    const offset = (page - 1) * limit;

    Questions.findAll({
        offset: offset,
        limit: limit,
    })
        .then((results) => res.send(results))
        .catch((error) => console.log(error));
    //.finally(() => connection.close());
};

exports.findQuestionById = (req, res) => {
    const urlId = req.params.id;

    Questions.findAll({
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

    try {
        await Questions.upsert({
            id: urlId,
            question: bodyReceived.question,
            category: bodyReceived.category,
            type: bodyReceived.type,
            difficulty: bodyReceived.difficulty,
            correct_answer: bodyReceived.correct_answer,
            incorrect_answers: bodyReceived.incorrect_answers,
        });
    } catch (error) {
        console.log(error);
    }

    res.status(201).send("succes");
};
