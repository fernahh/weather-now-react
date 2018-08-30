import React, { Component } from 'react'
import Topbar from '../components/topbar/topbar'
import WeatherPanel from './components/weather-panel/weather-panel'

class Weather extends Component {
  render() {
    return (
      <React.Fragment>
        <Topbar />
        <WeatherPanel />
      </React.Fragment>
    )
  }
}

export default Weather
