const express = require("express")
const app = express()
const cors = require("cors")
const models = require("./models")

app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {

    const books = await models.Book.findAll()
    res.json(books)
})


app.listen(8080, () => {
    console.log('Server is running on Port 8080')
})