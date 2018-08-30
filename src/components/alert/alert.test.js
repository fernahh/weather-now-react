import React from 'react'
import { shallow } from 'enzyme'
import Alert from './alert'

describe('<Alert />', () => {
  const action = jest.fn()
  const wrapper = shallow(<Alert message="Foobar" retryAction={action} />)
  
  it('render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
  
  it('execute retry action', () => {
    wrapper.find('Button').simulate('click')
    expect(action).toBeCalled()
  })
})
