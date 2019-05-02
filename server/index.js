const http = require('http')
const express = require('express')
const reload = require('reload')

const app = express()

app.use(express.static('public'))

const server = http.createServer(app)

reload(app)

server.listen(3000, () => {
  console.log('Web server listening on port 3000')
})
