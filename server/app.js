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

app.post("/", (req, res) => {
    const {title, genre, publisher, year, imageURL} = req.body

    const newBook = models.Book.build({
        title: title,
        genre: genre,
        publisher: publisher,
        year: year,
        imageURL: imageURL
    })
    newBook.save().then(savedBook => {
        res.json({
            success: true
        })

    })
})


app.listen(8080, () => {
    console.log('Server is running on Port 8080')
})