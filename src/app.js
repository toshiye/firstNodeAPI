const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true
})

const db = mongoose.connection

db.on('connected', () => {
    console.log('Mongoose default connection is open')
})

db.on('error', err => {
    console.log(`Mongoose default connection has ocurred \n${err}`)
})

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected')
})

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
            'Mongoose default connection is disconnected due to application termination'
        )
        process.exit(0)
    })
})

const Mentions = require('./models/mentions')

const indexRoutes = require('./routes/index-routes')
app.use('/', indexRoutes)

const mentionsRoutes = require('./routes/mentions-routes')
app.use('/mentions', mentionsRoutes)

module.exports = app