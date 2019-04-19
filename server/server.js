const express = require('express')
const app = express()
const server = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(server)

/* ----- Socket.io ----- */

const socketServer = require('./socketServer')
io.on('connection', socketServer.connection.bind(undefined, io))

/* ----- HTTP ----- */

const httpPort = process.env.PORT || 3333

app.use(express.static(path.resolve(__dirname, '../build')))

app.get('/ping', function (req, res) {
  return res.send('pong')
})

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
})

server.listen(httpPort, function () {
  console.log(`App running on http://localhost:${httpPort}/`)
})
