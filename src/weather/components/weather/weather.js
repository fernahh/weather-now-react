import React from 'react'
import Topbar from '../../../components/topbar/topbar'
import WeatherPanel from '../weather-panel/weather-panel'

function Weather() {
  return (
    <React.Fragment>
      <Topbar />
      <WeatherPanel />
    </React.Fragment>
  )
}

export default Weather
