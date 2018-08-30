import React from 'react'
import { shallow } from 'enzyme'
import Button from './button'

describe('<Button />', () => {
  it('render correctly', () => {
    const wrapper = shallow(<Button />)
    expect(wrapper).toMatchSnapshot()
  })
  
  it('execute function from onClick', () => {
    const onButtonClickSpy = jest.fn()
    const wrapper = shallow(<Button onClick={onButtonClickSpy} />)
    wrapper.find('button').simulate('click')
    expect(onButtonClickSpy).toBeCalled()
  })
  
  it('render button with submit type', () => {
    const wrapper = shallow(<Button type="submit" />)
    expect(wrapper).toMatchSnapshot()
  })  
})