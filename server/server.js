var express = require('express')
var path = require('path')
var app = express()

var port = process.env.PORT || 3333

app.use(express.static(path.resolve(__dirname, '../build')))

app.get('/ping', function (req, res) {
  return res.send('pong')
})

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
})

app.listen(port, function () {
  console.log(`App running on http://localhost:${port}/`)
})
