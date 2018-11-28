const express = require ('express')
const bodyParser = require ('body-parser')
const massive = require ('massive')
const session = require ('express-session')
const ac = require ('./controllers/AuthController')

const app = express()
require ('dotenv').config()

const {CONNECTION_STRING, PORT, SESSION_SECRET} = process.env
app.use(bodyParser.json())

massive(CONNECTION_STRING).then( db => {
    app.set('db', db) 
    console.log('yo db is connected')
})

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)
app.get('/auth/logout', ac.logout)
app.get('/auth/user', ac.getCurrentUser)




app.listen(PORT, () => {
    console.log('listening on port', PORT)
})