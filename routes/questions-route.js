module.exports = (app) => {
    const questions = require("../controllers/questions-controller.js");

    // Read all
    app.get("/questions", questions.findAll);
};
