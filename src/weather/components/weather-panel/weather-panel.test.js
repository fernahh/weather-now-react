import React from 'react'
import { shallow } from 'enzyme'
import WeatherPanel from './weather-panel'

describe('<WeatherPanel />', () => {
  it('render correctly', () => {
    const wrapper = shallow(<WeatherPanel />)
    expect(wrapper).toMatchSnapshot()
  })
})