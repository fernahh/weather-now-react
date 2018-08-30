import React from 'react'
import { shallow } from 'enzyme'
import Button from './button'

it('should render element with button class', () => {
  const wrapper = shallow(<Button />)
  expect(wrapper.hasClass('button')).toEqual(true)
})

it('should execute function from onClick', () => {
  const onButtonClickSpy = jest.fn()
  const wrapper = shallow(<Button onClick={onButtonClickSpy} />)
  wrapper.find('button').simulate('click')
  expect(onButtonClickSpy).toBeCalled()
})

it('should render button with submit type', () => {
  const wrapper = shallow(<Button type="submit" />)
  const type = wrapper.find('button').prop('type')
  expect(type).toEqual('submit')
})

it('should render button type as button when type is not present', () => {
  const wrapper = shallow(<Button />)
  const type = wrapper.find('button').prop('type')
  expect(type).toEqual('button')
})
