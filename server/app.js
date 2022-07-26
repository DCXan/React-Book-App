const express = require("express")
const app = express()
const cors = require("cors")
const models = require("./models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authenticate = require('./middleware/authenticate')
require("dotenv").config()


app.use(cors())
app.use(express.json())

app.get("/books/:userID", authenticate, async (req, res) => {
    
    const userID = req.params.userID

    try {
        const books = await models.Book.findAll({
            where: {
                userID: userID
            },
            order: [["createdAt", "ASC"]],
        })
        res.json({success: true, books: books})
    } catch (error) {
        console.log(error)
    }
})

app.post("/books", authenticate, async (req, res) => {
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
            success: false, message: 'Unable to save book.'
        })
    }
})

app.delete("/books/:userID/:bookID", authenticate, async (req, res) => {
    const userID = req.params.userID
    const bookID = req.params.bookID

    try {
        const deletedBook = await models.Book.destroy({
            where: {
                userID: userID,
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
    
    const user = await models.User.findOne({
        where: {
            email: email
        }
    })

    if (user) {
        res.json({success: false, message: 'Email already in use.'})
    } else {
        const newUser = models.User.build({
            email: email,
            password: hash
        })
    
        const _ = await newUser.save()
        res.json({
                success: true,
                message: "Account created successfully."
            })
    }

})

app.post("/login", async (req, res) => {
    const {email, password} = req.body

    const user = await models.User.findOne({
        where: { email: email }
    })

    if (user) {
        const validCreds = await bcrypt.compare(password, user.password)
    
        if (validCreds) {
            const token = jwt.sign({
                userID: user.id
            }, process.env.JWTKEY)
            res.json({
                success: true, userID: user.id, token: token
            })
        } else {
            res.json({success: false})
        }
    } else {
        res.json({
            success: false, message: 'Unable to log in. Please check your email/password.'
        })
    }

    
    
    
})


app.listen(8080, () => {
    console.log('Server is running on Port 8080')
})