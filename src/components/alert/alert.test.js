import React from 'react'
import { shallow } from 'enzyme'
import Alert from './alert'

it('should render element with alert class', () => {
  const wrapper = shallow(<Alert message="Foobar" retryAction={() => {}} />)
  expect(wrapper.hasClass('alert')).toEqual(true)
})

it('should render a paragraph with alert message', () => {
  const wrapper = shallow(<Alert message="Foobar" retryAction={() => {}} />)
  const message = wrapper.find('.alert__message').text()
  expect(message).toEqual('Foobar')
})

it('should execute retry action', () => {
  const action = jest.fn()
  const wrapper = shallow(<Alert message="Foobar" retryAction={action} />)
  wrapper.find('Button').simulate('click')
  expect(action).toBeCalled()
})
