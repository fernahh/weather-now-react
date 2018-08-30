import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RequestCard from '../../../containers/request-card/request-card'
import WeatherCard from '../../components/weather-card/weather-card'
import WeatherAPI from '../../api/weather-api'

const getCacheKey = ({ city, country }) => {
  return `weather-${city}-${country}`
}

const getWeather = (response) => {
  return {
    temperature: parseInt(response.data.main.temp, 10),
    humidity: response.data.main.humidity,
    pressure: response.data.main.pressure,
    updatedAt: response.updatedAt
  }
}

const getUrl = () => {
  return WeatherAPI.URL
}

const getUrlParams = ({ city, country }) => {
  return {
    appid: WeatherAPI.KEY,
    units: 'metric',
    q: `${city},${country}`
  }
}

class WeatherCardContainer extends Component {
  static propTypes = {
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    showDetails: PropTypes.bool
  }

  state = {
    weather: {}
  }

  cacheKey = getCacheKey({
    city: this.props.city,
    country: this.props.country
  })

  title = `${this.props.city}, ${this.props.country.toUpperCase()}`

  url = getUrl()  

  urlParams = getUrlParams({
    city: this.props.city,
    country: this.props.country
  })

  setWeather = (response) => {
    const weather = getWeather(response)
    this.setState({ weather })
  }

  onDataError = (error) => {
    console.error('Error on get data for <WeatherCardContainer />', error)
  }

  render() {    
    return (
      <div className="weather-card-container">
        <RequestCard 
          cacheKey={this.cacheKey}
          cacheTime={600000}
          onGetDataSuccess={this.setWeather}
          onGetDataError={this.onDataError}
          refreshInterval={600000}
          title={this.title}
          url={this.url}
          urlParams={this.urlParams}>
          <WeatherCard
            weather={this.state.weather} 
            showDetails={this.props.showDetails} />
        </RequestCard>
      </div>
    )
  }
}


export default WeatherCardContainer