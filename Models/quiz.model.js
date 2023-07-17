const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    answerOptions: {
        type: [String],
        required: true,
    },
    correctOptions: {
        type: [Number],
        required: true,
    },
});

const quizSchema = new mongoose.Schema({
    creator: {
        type: String
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    questions: {
        type: [questionSchema],
        required: true,
        validate: [arrayLimitation, 'Question should be between 2 and 10.'],
    },
},{
    timestamp: true,
    versionKey: false
});

function arrayLimitation(ele) {
    return ele.length >= 2 && ele.length <= 10;
}

const QuizModel = mongoose.model('quiz', quizSchema);

module.exports = { QuizModel }