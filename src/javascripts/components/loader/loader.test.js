import React from 'react'
import { shallow } from 'enzyme'
import Loader from './loader'

it('should render element with loader class', () => {
  const wrapper = shallow(<Loader />)
  expect(wrapper.hasClass('loader')).toEqual(true)
})