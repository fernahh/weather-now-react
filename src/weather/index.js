import React, { Component } from 'react'
import Topbar from '../components/topbar/topbar'
import WeatherRequestCard from './components/weather-request-card/weather-request-card'

class Weather extends Component {
  render() {
    return (
      <div>
        <Topbar />
        <WeatherRequestCard city="Urubici" country="br" title="Urubici" />
      </div>
    )
  }
}

export default Weather
