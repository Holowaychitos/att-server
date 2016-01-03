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
  app.get('/bus/', transport.getInfo)
  app.get('/bus/stops', transport.getStops)
  app.post('/bus/level', transport.setLevel)
  app.post('/bus/active', transport.setActiveBus)

  http.listen(PORT, () => {
    console.log('http://localhost:' + PORT)
  })

  return http
}

module.exports = server
