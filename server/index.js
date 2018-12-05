const express = require ('express')
const bodyParser = require ('body-parser')
const massive = require ('massive')
const session = require ('express-session')
const ac = require ('./controllers/AuthController')
const tc = require ('./controllers/timeLogController')

const app = express()
require ('dotenv').config()

const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env
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


app.post('/api/time', tc.addTime)
app.get('/api/time', tc.getTime)
app.delete('/api/time/:id', tc.delete)
app.put('/api/time/:id', tc.update)



app.listen(SERVER_PORT, () => {
    console.log('listening on port', SERVER_PORT)
})