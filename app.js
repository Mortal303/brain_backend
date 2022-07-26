const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const request = require("request");
const {
    render
} = require("ejs");
const db = require("./models");
db.sequelize.sync();

const app = express();
const Question = db.questions;

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


// GET REQ
app.get("/", function (req, res) {
    res.render("index");
});

app.get("/createQuestion", function (req, res) {
    res.render("createQuestion");
});

app.get("/api/fetchQuestion", function (req, res) {
    Question.findAll({})
        .then(data => {
            // console.log(data);
            var send = [];
            for (let index = 0; index < data.length; index++) {
                var push = {};
                push.numb = index+1;
                push.question = data[index].question;
                push.answer = data[index].answer;
                push.options = JSON.parse(data[index].options).option;
                send.push(push);
            }
            return res.status(200).json({
                data:send
            })
        })
        .catch(err => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });

        });
});

app.post("/api/createQuestion", function (req, res) {
    const question = {
        title: req.body.title,
        category: req.body.category,
        question: req.body.question,
        answer: req.body.answer,
        options: JSON.stringify(req.body),
    };
    Question.create(question)
        .then(data => {
            return res.send(data);
        })
        .catch(err => {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });
});

//db
db.sequelize.authenticate().then(function () {
    console.log('Nice! Database looks fine');
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});

const Port = process.env.PORT || 3000;

app.listen(Port, function () {
    console.log("server running on http://localhost:3000");
});