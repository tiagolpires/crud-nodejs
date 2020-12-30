const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const routes = require('./src/routes')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () =>{console.log('Connected to DB')}
)

app.use('/api', routes)

app.listen(3001)