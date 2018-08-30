import React from 'react'
import { shallow } from 'enzyme'
import Topbar from './topbar'
import Logo from '../logo/logo'

it('render correctly', () => {
  const wrapper = shallow(<Topbar />)
  expect(wrapper).toMatchSnapshot()
})