import WeatherRequestCardService from './weather-request-card-service'
import WeatherAPI from '../../api/weather-api'

describe('WeatherRequestCardService', () => {
  it('should return cache key', () => {
    const cacheKey = WeatherRequestCardService.getCacheKey({
      city: 'Joinville',
      country: 'br'
    })
    expect(cacheKey).toEqual('weather-Joinville-br')
  })

  it('should return weather', () => {
    const response = {
      data: {
        main: {
          temp: 9.8,
          humidity: 98,
          pressure: 893.2
        }
      },
      updatedAt: 1534377022450
    }
    const weather = WeatherRequestCardService.getWeather(response)
    expect(weather).toEqual({
      temperature: 9,
      humidity: 98,
      pressure: 893.2,
      updatedAt: 1534377022450
    })
  })

  it('should return url', () => {
    const url = WeatherRequestCardService.getUrl()
    expect(url).toEqual(WeatherAPI.URL)
  })


  it('should return url params', () => {
    const cacheKey = WeatherRequestCardService.getUrlParams({
      city: 'Joinville',
      country: 'br'
    })
    expect(cacheKey).toEqual({
      appid: WeatherAPI.KEY,
      units: 'metric',
      q: 'Joinville,br'
    })
  })
})