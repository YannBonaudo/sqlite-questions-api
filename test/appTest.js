const chai = require("chai");
const chaiHttp = require("chai-http");

const assert = require("chai").assert;
const R = require("../controllers/PostStructure");

chai.use(chaiHttp);

const expectedObject = {
    id: 32,
    question: "657465456456345645345634",
    category: "dghdf",
    type: "ghfdgdfg",
    difficulty: null,
    correct_answer: null,
    incorrect_answers: null,
    createdAt: "2020-06-16T09:43:27.799Z",
    updatedAt: "2020-06-16T09:45:18.374Z",
};

describe("test interne à une fonction", function (done) {
    it("api response = expectedObject", () => {
        chai.request("http://localhost:3000")
            .get("/questions/32")
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it("createStructureObject return an object", function () {
        assert.isObject(
            R.createStructureObject(1, { difficulty: "yes", type: "nono" })
        );
    });
});
