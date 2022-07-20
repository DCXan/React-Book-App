const express = require("express")
const app = express()
const cors = require("cors")
const models = require("./models")

app.use(cors())
app.use(express.json())
const bcrypt = require("bcryptjs")

app.get("/books/:userID", async (req, res) => {
    
    const userID = req.params.userID

    try {
        const books = await models.Book.findAll({
            where: {
                userID: userID
            }
        })
        res.json(books)
    } catch (error) {
        console.log(error)
    }
})

app.post("/books", async (req, res) => {
    const {title, genre, publisher, year, imageURL, userID} = req.body

    console.log(req.body)

    const newBook = models.Book.build({
        title: title,
        genre: genre,
        publisher: publisher,
        year: year,
        imageURL: imageURL,
        userID: userID
    })

    try  {
        const _ = await newBook.save()
        res.json({
                success: true
            })
    } catch {
        res.json({
            success:false, message: 'Unable to save book.'
        })
    }
})

app.delete("/books/:bookID", async (req, res) => {
    const bookID = req.params.bookID

    try {
        const deletedBook = await models.Book.destroy({
            where: {
                id: bookID
            }
        })
        res.json({
            success: true
        })
    } catch(error) {
        res.json({
            success: false, message: error
        })
    }
})

app.post("/register", async (req, res) => {
    const {email, password} = req.body

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    const newUser = models.User.build({
        email: email,
        password: hash
    })

    const _ = await newUser.save()
    res.json({
            success: true
        })
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body

    const user = await models.User.findOne({
        where: { email: email }
    })

    if (user) {
        const validCreds = await bcrypt.compare(password, user.password)
    
        if (validCreds) {
            res.json({
                success: true, userID: user.id
            })
        }
    } else {
        res.json({
            success: false, message: 'Unable to log in.'
        })
    }

    
    
    
})


app.listen(8080, () => {
    console.log('Server is running on Port 8080')
})