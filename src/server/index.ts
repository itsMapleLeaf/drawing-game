import * as express from 'express'
import * as socketio from 'socket.io'
import * as http from 'http'
import { resolve } from 'path'

const port = process.env.PORT || 3000
const app = express()
const server = new http.Server(app)
const io = socketio(server)

app.use('/', express.static(resolve(__dirname, 'public')))

io.on('connection', socket => {
  console.log(`Connection from ${socket.id}`)

  socket.on('message', params => {
    if (params === 'hi') {
      console.log('someone said hi :D')
    } else {
      console.log('¯\\_(ツ)_/¯')
    }
  })
})

server.listen(port, () => {
  console.log(`Listening on localhost:${port}`)
})
