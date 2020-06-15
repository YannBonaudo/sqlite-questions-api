var Sequelize = require("sequelize");

const dbName = "main.db";

var connection = new Sequelize(dbName, "root", "", {
    dialect: "sqlite",
    storage: "../" + dbName,
    host: "localhost",
});

var Article = connection.define("article", {
    title: Sequelize.STRING,
    body: Sequelize.TEXT,
});

/*
connection.sync().then(() => {
    Article.create({
        title: "demo title",
        body: "Eu deserunt amet in consequat irure velit.",
    });
});
*/

Article.findAll({
    where: {
        id: 1,
    },
})
    .then((results) => {
        const resultsData = results[0].dataValues;
        console.log(resultsData);
    })
    .catch((error) => console.log(error))
    .finally(() => connection.close());

/*
connection.sync().then(() => {
    Questions.create({
        question: "t ki",
        difficulty: "dur",
    });
});
*/
