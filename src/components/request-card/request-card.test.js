import React from 'react'
import { shallow } from 'enzyme'
import RequestCard from './request-card'
import Card from '../card/card'
import Loader from '../loader/loader'
import Alert from '../alert/alert'

describe('<RequestCard />', () => {
  const retryAction = jest.fn()

  const getRequestCardWrapper = (fetchAction) => {
    return shallow(
      <RequestCard title="Foobar" fetch={fetchAction} retryAction={retryAction}>
        <p className="content">Content</p>
      </RequestCard>
    )
  }

  describe('when render', () => {
    const fetchAction = jest.fn().mockReturnValue(new Promise(jest.fn(), jest.fn()))
    const wrapper = getRequestCardWrapper(fetchAction)

    it('should have request-card class', () => {
      expect(wrapper.hasClass('request-card')).toEqual(true)
    })
    
    it('should have a title', () => {
      const cardProps = wrapper.find(Card).props()
      expect(cardProps.title).toEqual('Foobar')
    })
    
    it('should fetch data', () => {
      expect(fetchAction).toHaveBeenCalled()
    })

    it('should set showLoader as true', () => {
      expect(wrapper.state('showLoader')).toEqual(true)
    })

    it('should show Loader component', () => {
      expect(wrapper.contains(<Loader />)).toEqual(true)
    })

    it('should not render children', () => {
      expect(wrapper.exists('.content')).toEqual(false)
    })
  })

  describe('when fetch data complete with success', () => {
    const fetchAction = jest.fn().mockReturnValue(Promise.resolve())
    const wrapper = getRequestCardWrapper(fetchAction)

    it('should set showLoader as false', () => {
      expect(wrapper.state('showLoader')).toEqual(false)
    })

    it('should not show Loader component', () => {
      expect(wrapper.contains(<Loader />)).toEqual(false)
    })

    it('should render children', () => {
      expect(wrapper.exists('.content')).toEqual(true)
    })
  })

  describe('when fetch is rejected', () => {
    const fetchAction = jest.fn().mockReturnValue(Promise.reject())
    const wrapper = getRequestCardWrapper(fetchAction)

    it('should set showLoader as false', () => {
      expect(wrapper.state('showLoader')).toEqual(false)
    })

    it('should not show Loader component', () => {
      expect(wrapper.contains(<Loader />)).toEqual(false)
    })

    it('should set showError from alert as true', () => {
      expect(wrapper.state('showError')).toEqual(true)
    })

    it('should not render children', () => {
      expect(wrapper.exists('.content')).toEqual(false)
    })

    it('should show alert component', () => {
      expect(wrapper.contains(
        <Alert message="Something went wrong" retryAction={retryAction}/>)
      ).toEqual(true)
    })
  })
})