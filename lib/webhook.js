'use strict'
// GET /luigi/v1/service/bus_route_info :: all Stops
// POST /luigi/v1/emulate/bus_stop_load :: {busStopId: "6215", busStopLoad: 20}
// POST /luigi/v1/emulate/bus_route_id :: {busRouteId: "1081"}
// POST /luigi/v1/emulate/current_bus_stop_id :: {currentBusStopId: "2251"}

// const axios = require('axios')

module.exports = {
  passenger: (req, res) => {
    console.log(req.body)
  },

  currentStop: (req, res) => {
    console.log(req.body)
  }
}
