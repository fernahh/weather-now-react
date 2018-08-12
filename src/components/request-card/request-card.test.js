import React from 'react'
import { shallow } from 'enzyme'
import axios from 'axios'
import RequestCard from './request-card'
import Card from '../card/card'
import Loader from '../loader/loader'
import Alert from '../alert/alert'

jest.mock('axios')
jest.useFakeTimers()

describe('<RequestCard />', () => {
  const retryAction = jest.fn()
  const onGetDataSuccess = jest.fn()
  const onGetDataError = jest.fn()

  const getRequestCardWrapper = (refreshInterval) => {
    return shallow(
      <RequestCard 
        title="Foobar" 
        url="http://api.com/dog"
        onGetDataSuccess={onGetDataSuccess}
        onGetDataError={onGetDataError}
        refreshInterval={refreshInterval}
        retryAction={retryAction}>
        <p className="content">Content</p>
      </RequestCard>
    )
  }

  describe('when render', () => {
    axios.get.mockImplementation(() => new Promise(jest.fn())) 
    const wrapper = getRequestCardWrapper()

    it('should have request-card class', () => {
      expect(wrapper.hasClass('request-card')).toEqual(true)
    })
    
    it('should have a title', () => {
      const cardProps = wrapper.find(Card).props()
      expect(cardProps.title).toEqual('Foobar')
    })
    
    it('should call get method with url', () => {
      expect(axios.get).toHaveBeenCalledWith('http://api.com/dog')
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

  describe('when get data complete with success', () => {
    const data = { name: 'Lassie' }
    axios.get.mockImplementation(() => Promise.resolve(data))
    const wrapper = getRequestCardWrapper()

    it('should set showLoader as false', () => {
      expect(wrapper.state('showLoader')).toEqual(false)
    })

    it('should not show Loader component', () => {
      expect(wrapper.contains(<Loader />)).toEqual(false)
    })

    it('should render children', () => {
      expect(wrapper.exists('.content')).toEqual(true)
    })

    it('should execute onGetDataSuccess callback with data response', () => {
      expect(onGetDataSuccess).toHaveBeenCalledWith(data)
    })
  })

  describe('when get data is rejected', () => {
    const error = { message: 'Some error message' }
    axios.get.mockImplementation(() => Promise.reject(error))
    const wrapper = getRequestCardWrapper()

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

    it('should execute onGetDataError callback with error response', () => {
      expect(onGetDataError).toHaveBeenCalledWith(error)
    })

    it('should show alert component', () => {
      expect(wrapper.contains(
        <Alert message="Something went wrong" retryAction={retryAction}/>)
      ).toEqual(true)
    })
  })

  describe('when refresh interval', () => {
    axios.get.mockImplementation(() => new Promise(jest.fn())) 
    const wrapper = getRequestCardWrapper(6000)

    it('should call get method with url', () => {
      axios.get.mockClear()
      expect(axios.get).not.toBeCalled()
    
      jest.runOnlyPendingTimers()
      expect(axios.get).toHaveBeenCalledWith('http://api.com/dog')
    })

    it('should clear interval on unmount', () => {
      wrapper.unmount()
      expect(clearInterval).toHaveBeenCalled()
    })
  })

  describe('when refresh interval is not declared', () => {
    axios.get.mockImplementation(() => new Promise(jest.fn())) 
    const wrapper = getRequestCardWrapper()

    it('should not call set interval method', () => {
      setInterval.mockClear()
      expect(setInterval).not.toBeCalled()
    })

    it('should not call clear interval on unmount', () => {
      clearInterval.mockClear()
      wrapper.unmount()
      expect(clearInterval).not.toBeCalled()
    })
  })
})