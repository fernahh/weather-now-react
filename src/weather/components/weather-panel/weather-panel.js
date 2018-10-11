import React from 'react'
import WeatherCardContainer from '../../containers/weather-card-container/weather-card-container'
import './weather-panel.scss'

function WeatherPanel() {
  return (
    <div className="weather-panel">
      <WeatherCardContainer city="Urubici" country="br" showDetails={true} />
      <WeatherCardContainer city="Nuuk" country="gl" />
      <WeatherCardContainer city="Nairobi" country="ke" />
    </div>
  )
}

export default WeatherPanel