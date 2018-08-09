import React from 'react'
import { shallow } from 'enzyme'
import Topbar from './topbar'
import Logo from '../logo/logo'

it('should render element with topbar class', () => {
  const wrapper = shallow(<Topbar />)
  expect(wrapper.hasClass('topbar')).toEqual(true)
})

it('should contains Logo component', () => {
  const wrapper = shallow(<Topbar />)
  expect(wrapper.contains(<Logo />)).toEqual(true)
})