const express = require("express")
const cors = require("cors")
const { connection } = require("./Connections/db")
const { userRouter } = require("./Routes/user.routes")
const { quizRouter } = require("./Routes/quiz.routes")

require('dotenv').config
const port = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(cors())

app.use("/", userRouter)
app.use("/quiz", quizRouter)



app.listen(port, async()=>{
    try {
        await connection
        console.log("Connected to Database Successfully")
    } catch (error) {
        console.log("Not Connected to Database")
        console.log(error)
    }
    console.log(`Server is running on port ${port}`)
})
