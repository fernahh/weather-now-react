import React from 'react'
import PropTypes from 'prop-types'
import date from '../../../services/date/date'
import './weather-card.css'

function getTemperatureState(temperature) {
  if (temperature <= 5)
    return 'cold'

  return (temperature > 25) ? 'hot' : 'normal'
}

function WeatherCard({ weather, showDetails }) {
  const { 
    humidity, 
    pressure,
    temperature, 
    updatedAt 
  } = weather
  
  const dateTime = date.formatTimestamp({
    timestamp: updatedAt,
    formatType: 'YYYY-MM-DD hh:mm'
  })

  const formattedDate = date.formatTimestamp({
    timestamp: updatedAt,
    formatType: 'hh:mm:ss A'
  })

  const temperatureState = getTemperatureState(temperature)

  return (
    <div className="weather-card">
      <span className={`weather-card__temperature--${temperatureState}`}>
        {temperature}<span className="weather-card__temperature__celcius">&deg;</span>
      </span>
      <section className="weather-card__footer">
        {showDetails && <div className="weather-card__details weather-card__footer__row">
          <dl className="weather-card__definition-list">
            <div className="weather-card__definition-list__column">
              <dt>Humidity</dt>
              <dd>
                {humidity}<span className="weather-card__unit">%</span>
              </dd>
            </div>
            <div className="weather-card__definition-list__column">
              <dt>Pressure</dt>
              <dd>
                {pressure}<span className="weather-card__unit">hPa</span>
              </dd>
            </div>
          </dl>
        </div>}
        <div className="weather-card__footer__row">
          <div className="weather-card__update-at">
            <p>Updated at <time dateTime={dateTime}>{formattedDate}</time></p>
          </div>
        </div>
      </section>
    </div>
  )
}

WeatherCard.propTypes = {
  showDetails: PropTypes.bool,
  weather: PropTypes.object.isRequired
}

export default WeatherCard