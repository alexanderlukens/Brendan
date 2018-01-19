const express = require('express')
const parser = require('body-parser')
const router = require('./routes.js')
const app = express()


app.use(parser.json({limit: '50mb'}))
app.use(express.static(__dirname + '/../client/dist'));
app.use('/api', router);


const server = app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
