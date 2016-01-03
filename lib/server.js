'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require('http').Server(app)
const transport = require('./transport')
const webhook = require('./webhook')
const path = require('path')

function server (config) {
  const PORT = process.env.PORT || config.PORT
  const pub = path.resolve(__dirname, '..', 'public')
  app.use(express.static(pub))

  app.use(bodyParser.json()) // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

  app.get('/routes', transport.getRoutes)
  app.get('/bus/:id', transport.getActiveBus)
  app.post('/bus/:id/level', transport.setLevel)
  app.post('/bus/:id/current_stop', transport.currentBusStop)

  app.post('/webhook/pasajeros', webhook.passenger)
  app.post('/webhook/paradaactual', webhook.currentStop)

  http.listen(PORT, () => {
    console.log('http://localhost:' + PORT)
  })

  return http
}

module.exports = server
