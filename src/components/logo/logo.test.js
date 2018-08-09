import React from 'react'
import { shallow } from 'enzyme'
import Logo from './logo'

it('should render element with logo class', () => {
  const wrapper = shallow(<Logo />)
  expect(wrapper.hasClass('logo')).toEqual(true)
})