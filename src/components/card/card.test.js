import React from 'react'
import { shallow } from 'enzyme'
import Card from './card'

describe('<Card />', () => {
  it('render correctly', () => {
    const wrapper = shallow(<Card title="Foobar" />)
    expect(wrapper).toMatchSnapshot()
  })
  
  it('render card content', () => {
    const wrapper = shallow(<Card title="Foobar"><p>Foobar</p></Card>)
    expect(wrapper).toMatchSnapshot()
  })
})