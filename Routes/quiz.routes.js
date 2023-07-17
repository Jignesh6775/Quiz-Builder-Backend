const express = require('express');
const app = express();
const quizRouter = express.Router()
const { QuizModel } = require('../Models/quiz.model')

//Get all quiz data
quizRouter.get('/get', async (req, res) => {
    try {
        const data = await QuizModel.find()
        res.status(201).json(data)
    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
})

quizRouter.post("/add", async (req, res) => {
    try {
        const quizData = new QuizModel(req.body);
        await quizData.save()
        res.status(201).json({ "message": "A New Quiz Question added successfully" });
    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
})


quizRouter.put('/:quizID', async (req, res) => {
    const { quizID } = req.params;
    const { title, description } = req.body;
    try {
        const quizData = await QuizModel.findByIdAndUpdate(
            quizID,
            { title, description },
            { new: true }
        );
        res.status(201).json(quizData);
    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
})


quizRouter.delete('/:quizID', async (req, res) => {
    const { quizID } = req.params;
    try {
        await QuizModel.findByIdAndDelete(quizID)
        res.status(201).send({ "message": "Quiz deleted successfully" });
    } catch (error) {
        res.status(404).send({ "message": error.message })
    }
})


module.exports = { quizRouter }