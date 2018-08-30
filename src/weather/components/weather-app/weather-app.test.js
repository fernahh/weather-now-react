import React from 'react'
import { shallow } from 'enzyme'
import WeatherApp from './weather-app'

describe('<WeatherApp />', () => {  
  it('render correctly', () => {
    const wrapper = shallow(<WeatherApp />)
    expect(wrapper).toMatchSnapshot()
  })
})
