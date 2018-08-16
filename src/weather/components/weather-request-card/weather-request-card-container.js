import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RequestCard from '../../../components/request-card/request-card'
import WeatherRequestCardService from './weather-request-card-service'

class WeatherRequestCardContainer extends Component {
  static propTypes = {
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired
  }

  state = {
    weather: {}
  }

  cacheKey = WeatherRequestCardService.getCacheKey({
    city: this.props.city,
    country: this.props.country
  })

  url = WeatherRequestCardService.getUrl()  

  urlParams = WeatherRequestCardService.getUrlParams({
    city: this.props.city,
    country: this.props.country
  })

  setWeather = (response) => {
    const weather = WeatherRequestCardService.getWeather(response)
    this.setState({ weather })
  }

  onDataError = (error) => {
    console.log('Error on get data for <WeatherRequestCardContainer />:', error)
  }

  render() {
    const { 
      humidity, 
      pressure, 
      temperature, 
      updatedAt 
    } = this.state.weather
    
    return (
      <article className="weather-request-card">
        <RequestCard 
          cacheKey={this.cacheKey}
          cacheTime={600000}
          onGetDataSuccess={this.setWeather}
          onGetDataError={this.onDataError}
          refreshInterval={600000}
          title={this.props.city}
          url={this.url}
          urlParams={this.urlParams}>
          <div className="weather-request-card__content">
            <section className="weather-request-card__temperature">
              <p>{temperature}</p>
            </section>
            <section className="weather-request-card__footer">
              <p>{humidity}</p>
              <p>{pressure}</p>
              <p>{updatedAt}</p>
            </section>
          </div>
        </RequestCard>
      </article>
    )
  }
}


export default WeatherRequestCardContainer