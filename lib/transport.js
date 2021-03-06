'use strict'
// GET /luigi/v1/service/bus_route_info :: all Stops
// POST /luigi/v1/emulate/bus_stop_load :: {busStopId: "6215", busStopLoad: 20}
// POST /luigi/v1/emulate/bus_route_id :: {busRouteId: "1081"}
// POST /luigi/v1/emulate/current_bus_stop_id :: {currentBusStopId: "2251"}
const axios = require('axios')
const URL = 'http://silv3rston3.hack.att.io:5000'

const errorResponse = (res, response) => {
  console.log('Error', response)
  res.status(404).send('Sorry, we cannot find that!').end()
}

const getInfo = (req, res) => {
  const PATH = '/luigi/v1/service/bus_route_info'

  axios.get(URL + PATH)
    .then((response) => {
      res.json(response.data)
    })
    .catch(errorResponse.bind(null, res))
}

const setLevel = (req, res) => {
  const PATH = '/luigi/v1/emulate/bus_stop_load'
  const data = {
    busStopId: req.body.busStopId,
    busStopLoad: req.body.busStopLoad
  }

  axios.post(URL + PATH, data)
    .then((response) => {
      res.json(response.data)
    })
    .catch(errorResponse.bind(null, res))
}

const currentBusStop = (req, res) => {
  const PATH = '/luigi/v1/emulate/current_bus_stop_id'
  const data = {
    currentBusStopId: req.body.currentBusStopId
  }

  axios.post(URL + PATH, data)
    .then((response) => {
      res.json(response.data)
    })
    .catch(errorResponse.bind(null, res))
}

const activeBus = (req, res, callback) => {
  const PATH = '/luigi/v1/emulate/bus_route_id'
  const data = {
    busRouteId: req.params.id
  }

  axios.post(URL + PATH, data)
    .then((response) => {
      callback(req, res)
    })
    .catch(errorResponse.bind(null, res))
}

module.exports = {
  getRoutes: (req, res) => {
    const routesUrl = 'http://silv3rston3.hack.att.io/emulator-api/data/busroutes.json'

    axios.get(routesUrl)
      .then((response) => {
        res.json(response.data)
      })
      .catch(errorResponse.bind(null, res))
  },

  getStops: (req, res) => {
    const PATH = '/luigi/v1/service/bus_route_info'

    axios.get(URL + PATH)
      .then((response) => {
        res.json(response.data.busRouteInfo.stops)
      })
      .catch(errorResponse.bind(null, res))
  },

  getActiveBus: (req, res) => {
    getInfo(req, res)
  },

  setLevel: (req, res) => {
    setLevel(req, res)
  },

  currentBusStop: (req, res) => {
    currentBusStop(req, res)
  }
}
