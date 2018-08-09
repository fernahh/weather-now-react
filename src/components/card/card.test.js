import React from 'react'
import { shallow } from 'enzyme'
import Card from './card'

it('should render element with card class', () => {
  const wrapper = shallow(<Card title="Foobar" />)
  expect(wrapper.hasClass('card')).toEqual(true)
})

it('should render header with card title', () => {
  const wrapper = shallow(<Card title="Foobar" />)
  const title = wrapper.find('.card__title').text()
  expect(title).toEqual('Foobar')
})

it('should render card content', () => {
  const wrapper = shallow(<Card title="Foobar"><p>Foobar</p></Card>)
  expect(wrapper.find('.card__content').html()).toEqual(
    '<section class="card__content"><p>Foobar</p></section>'
  )
})