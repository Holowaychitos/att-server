'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require('http').Server(app)
const transport = require('./transport')
const path = require('path')

function server (config) {
  const PORT = process.env.PORT || config.PORT
  const pub = path.resolve(__dirname, '..', 'public')
  app.use(express.static(pub))

  app.use(bodyParser.json()) // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

  app.get('/routes', transport.getRoutes)
  app.get('/bus/:id', transport.getInfo)
  app.get('/bus/:id/stops', transport.getStops)
  app.post('/status/bus', transport.setLevel)

  http.listen(PORT, () => {
    console.log('http://localhost:' + PORT)
  })

  return http
}

module.exports = server
