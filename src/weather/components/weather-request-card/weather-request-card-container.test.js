import React from 'react'
import { shallow } from 'enzyme'
import WeatherRequestCardService from './weather-request-card-service'
import WeatherRequestCardContainer from './weather-request-card-container'
import RequestCard from '../../../components/request-card/request-card'


describe('<WeatherRequestCardContainer />', () => {
  const city = 'Urubici'
  const country = 'br'
  const cacheKeyMock = 'Urubici,br'
  const urlMock = 'http://api.com'
  const urlParmsMock = { foo: 'bar' }
  const weatherMock = { temparature: 30 }

  WeatherRequestCardService.getCacheKey = jest.fn().mockReturnValue(cacheKeyMock)
  WeatherRequestCardService.getUrl = jest.fn().mockReturnValue(urlMock)
  WeatherRequestCardService.getCacheKey = jest.fn().mockReturnValue(cacheKeyMock)
  WeatherRequestCardService.getUrlParams = jest.fn().mockReturnValue(urlParmsMock)
  WeatherRequestCardService.getWeather = jest.fn().mockReturnValue(weatherMock)
  jest.spyOn(console, 'log').mockImplementation(jest.fn())

  const wrapper = shallow(<WeatherRequestCardContainer city="Urubici" country="br" />)

  it('should render a element with weather-request-card class', () => {
    expect(wrapper.hasClass('weather-request-card')).toEqual(true)
  })
  
  it('should contains RequestCard component', () => {
    expect(wrapper.find(RequestCard).length).toBeTruthy()
  })

  it('should get cacheKey from getCacheKey of WeatherRequestCardService', () => {
    expect(WeatherRequestCardService.getCacheKey).toHaveBeenCalledWith({city, country})
    expect(wrapper.instance().cacheKey).toEqual(cacheKeyMock)
  })

  it('should get url from getUrl of WeatherRequestCardService', () => {
    expect(WeatherRequestCardService.getUrl).toHaveBeenCalled()
    expect(wrapper.instance().url).toEqual(urlMock)
  })

  it('should get params from getUrlParams of WeatherRequestCardService', () => {
    expect(WeatherRequestCardService.getUrlParams).toHaveBeenCalled()
    expect(wrapper.instance().urlParams).toEqual(urlParmsMock)
  })

  it('should get weather from getWeather of WeatherRequestCardService', () => {
    const response = { temp: 30 }
    wrapper.instance().setWeather(response)
    expect(WeatherRequestCardService.getWeather).toHaveBeenCalledWith(response)
    expect(wrapper.state('weather')).toEqual(weatherMock)
  })

  it('should log error', () => {
    const error = 'Something went wrong'
    wrapper.instance().onDataError(error)
    expect(console.log).toHaveBeenCalledWith(
      'Error on get data for <WeatherRequestCardContainer />:', error
    )
  })
})