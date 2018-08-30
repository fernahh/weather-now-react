import React, { Component } from 'react'
import Topbar from '../components/topbar/topbar'
import WeatherCardContainer from './containers/weather-card-container/weather-card-container'

class Weather extends Component {
  render() {
    return (
      <div>
        <Topbar />
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <WeatherCardContainer city="Urubici" country="br" showDetails={true} />
          <WeatherCardContainer city="Nuuk" country="gl" />
          <WeatherCardContainer city="Nairobi" country="ke" />
        </div>
      </div>
    )
  }
}

export default Weather
