module.exports = (app) => {
    const questions = require("../controllers/questions-controller.js");

    // Read all
    app.get("/questions", questions.findAll);

    // Read 1 question
    app.get("/questions/:id", questions.findQuestionById);

    // post to update or add
    app.post("/questions/:id", questions.postQuestions);
};
