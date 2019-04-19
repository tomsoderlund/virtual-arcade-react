const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const io = require('socket.io')(http)

/*----- Socket.io -----*/

const socketServer = require('./socketServer')

const socketPort = process.env.SOCKETPORT || 8888

io.on('connection', socketServer.connection.bind(undefined, io))
io.listen(socketPort)

/*----- HTTP -----*/

const httpPort = process.env.PORT || 3333

app.use(express.static(path.resolve(__dirname, '../build')))

app.get('/ping', function (req, res) {
  return res.send('pong')
})

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../build/index.html'))
})

app.listen(httpPort, function () {
  console.log(`App running on http://localhost:${httpPort}/`)
})
