import React from 'react'
import { shallow } from 'enzyme'
import WeatherCard from './weather-card'
import date from '../../../services/date/date'

jest.mock('../../../services/date/date')

describe('<WeatherCard />', () => {
  it('set cold weather temperature', () => {
    const weather = { temperature: 5 }
    const wrapper = shallow(<WeatherCard weather={weather} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('set normal weather temperature', () => {
    const weather = { temperature: 24 }
    const wrapper = shallow(<WeatherCard weather={weather} />)
    expect(wrapper).toMatchSnapshot()
  }) 

  it('set hot weather temperature', () => {
    const weather = { temperature: 26 }
    const wrapper = shallow(<WeatherCard weather={weather} />)
    expect(wrapper).toMatchSnapshot()
  }) 

  it('show details', () => {
    const weather = { temperature: 26 }
    const wrapper = shallow(<WeatherCard weather={weather} showDetails={true} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('do not show details', () => {
    const weather = { temperature: 26 }
    const wrapper = shallow(<WeatherCard weather={weather} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('render formatted update at time', () => {
    const weather = { updatedAt: 1535636728998 }
    const updatedAtFormatted = '2018-08-30 10:20'
    date.formatTimestamp.mockReturnValue(updatedAtFormatted)
    const wrapper = shallow(<WeatherCard weather={weather} />)

    expect(date.formatTimestamp).toBeCalledWith({
      timestamp: weather.updatedAt,
      formatType: 'YYYY-MM-DD hh:mm'
    })
    expect(date.formatTimestamp).toBeCalledWith({
      timestamp: weather.updatedAt,
      formatType: 'hh:mm:ss A'
    })
    expect(wrapper).toMatchSnapshot()
  })
})