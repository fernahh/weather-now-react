import React from 'react'
import { shallow } from 'enzyme'
import Weather from './weather'

describe('<Weather />', () => {  
  it('render correctly', () => {
    const wrapper = shallow(<Weather />)
    expect(wrapper).toMatchSnapshot()
  })
})
