import WeatherAPI from '../../api/weather-api'

const WeatherRequestCardService = {
  getCacheKey({ city, country }) {
    return `weather-${city}-${country}`
  },

  getWeather(response) {
    return {
      temperature: parseInt(response.data.main.temp, 10),
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      updatedAt: response.updatedAt
    }
  },

  getUrl() {
    return WeatherAPI.URL
  },

  getUrlParams({ city, country }) {
    return {
      appid: WeatherAPI.KEY,
      units: 'metric',
      q: `${city},${country}`
    }
  }
}

export default WeatherRequestCardService