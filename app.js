require('dotenv').config()
const express = require('express')
const cors = require('cors')

const routes = require('./src/routes/index.js')

const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(express.static('public'))

app.use('/', routes)

app.use('/404', (req, res) => {
  return res.status(404).send({
    success: false,
    message: 'Resource not found'
  })
})

app.use('*', (req, res) => {
  return res.redirect('/404')
})

app.listen(process.env.PORT || 3333, () => {
  console.log(`App listening on port ${process.env.PORT || 3333}`)
})