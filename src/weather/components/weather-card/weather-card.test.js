import React from 'react'
import { shallow } from 'enzyme'
import WeatherCard from './weather-card'
import date from '../../../services/date/date'

jest.mock('../../../services/date/date')

describe('<WeatherCard />', () => {
  it('should set cold weather temperature', () => {
    const weather = { temperature: 5 }
    const wrapper = shallow(<WeatherCard weather={weather} />)
    const coldTemperature = '.weather-card__temperature--cold'
    expect(wrapper.find(coldTemperature).length).toBeTruthy()
  })

  it('should set normal weather temperature', () => {
    const weather = { temperature: 24 }
    const wrapper = shallow(<WeatherCard weather={weather} />)
    const coldTemperature = '.weather-card__temperature--normal'
    expect(wrapper.find(coldTemperature).length).toBeTruthy()    
  }) 

  it('should set hot weather temperature', () => {
    const weather = { temperature: 26 }
    const wrapper = shallow(<WeatherCard weather={weather} />)
    const coldTemperature = '.weather-card__temperature--hot'
    expect(wrapper.find(coldTemperature).length).toBeTruthy()    
  }) 

  it('should show details', () => {
    const weather = { temperature: 26 }
    const wrapper = shallow(<WeatherCard weather={weather} showDetails={true} />)
    const detailsSelector = '.weather-card__details'
    expect(wrapper.find(detailsSelector).length).toBeTruthy()

  })

  it('should not show details', () => {
    const weather = { temperature: 26 }
    const wrapper = shallow(<WeatherCard weather={weather} />)
    const detailsSelector = '.weather-card__details'
    expect(wrapper.find(detailsSelector).length).toBeFalsy()
  })

  it('should render formatted update at time', () => {
    const weather = { updatedAt: 1535636728998 }
    const updatedAtFormatted = '2018-08-30 10:20'
    date.formatTimestamp.mockReturnValue(updatedAtFormatted)
    const wrapper = shallow(<WeatherCard weather={weather} />)
    const formattedDateSelector = '.weather-card__update-at time'

    expect(date.formatTimestamp).toBeCalledWith({
      timestamp: weather.updatedAt,
      formatType: 'YYYY-MM-DD hh:mm'
    })
    expect(date.formatTimestamp).toBeCalledWith({
      timestamp: weather.updatedAt,
      formatType: 'hh:mm:ss A'
    })
    expect(wrapper.find(formattedDateSelector).contains(updatedAtFormatted)).toEqual(true)
  })
})