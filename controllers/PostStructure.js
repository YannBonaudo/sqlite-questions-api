module.exports = {
    createStructureObject: function (urlId, bodyReceived) {
        const object = {
            id: urlId,
            question: bodyReceived.question,
            category: bodyReceived.category,
            type: bodyReceived.type,
            difficulty: bodyReceived.difficulty,
            correct_answer: bodyReceived.correct_answer,
            incorrect_answers: bodyReceived.incorrect_answers,
        };

        console.log(object);

        return object;
    },
};
