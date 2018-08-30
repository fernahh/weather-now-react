import React from 'react'
import { shallow } from 'enzyme'
import WeatherCardContainer from './weather-card-container'
import WeatherAPI from '../../api/weather-api'
import RequestCard from '../../../containers/request-card/request-card'
import WeatherCard from '../../components/weather-card/weather-card'

jest.mock('../../api/weather-api')
global.console = { error: jest.fn() }

describe('<WeatherCardContainer />', () => {
  WeatherAPI.KEY = 'somekey'
  WeatherAPI.URL = 'http://api.com'
  const wrapper = shallow(<WeatherCardContainer city="Joinville" country="br" />)
  const requestCard = wrapper.find(RequestCard)

  it('should set cacheKey', () => {
    expect(wrapper.instance().cacheKey).toEqual('weather-Joinville-br')
  })

  it('should set title', () => {
    expect(wrapper.instance().title).toEqual('Joinville, BR')
  })

  it('should set url', () => {
    expect(wrapper.instance().url).toEqual('http://api.com')
  })

  it('should set urlParams', () => {
    expect(wrapper.instance().urlParams).toEqual({
      appid: WeatherAPI.KEY,
      units: 'metric',
      q: 'Joinville,br'
    })
  })

  it('should set weather on get data success', () => {
    const response = {
      data: {
        main: {
          temp: 28.1,
          humidity: 56,
          pressure: 888.89
        }
      },
      updatedAt: 1535640749802
    }
    requestCard.prop('onGetDataSuccess')(response)
    expect(wrapper.state('weather')).toEqual({
      humidity: 56,
      pressure: 888.89,
      temperature: 28,
      updatedAt: 1535640749802
    })
  })

  it('should log error on get data error', () => {
    requestCard.prop('onGetDataError')('Something went wrong')
    expect(console.error).toBeCalledWith(
      'Error on get data for <WeatherCardContainer />', 'Something went wrong'
    )
  })

  it('should render RequestCard container', () => {
    expect(wrapper.find(RequestCard).length).toBeTruthy()
  })

  it('should render WeatherCard', () => {
    expect(wrapper.find(WeatherCard).length).toBeTruthy()
  })
})