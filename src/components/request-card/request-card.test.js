import React from 'react'
import { shallow } from 'enzyme'
import addMilliseconds from 'date-fns/add_milliseconds'
import subMilliseconds from 'date-fns/sub_milliseconds'
import getTime from 'date-fns/get_time'
import RequestCard from './request-card'
import Card from '../card/card'
import Loader from '../loader/loader'
import Alert from '../alert/alert'
import storage from '../../services/storage/storage'
import request from '../../services/request/request'
import date from '../../services/date/date'

jest.mock('../../services/request/request')
jest.mock('../../services/storage/storage')
jest.useFakeTimers()
date.now = jest.fn()

describe('<RequestCard />', () => {
  const retryAction = jest.fn()
  const onGetDataSuccess = jest.fn()
  const onGetDataError = jest.fn()

  const getRequestCardWrapper = (refreshInterval, cacheKey, cacheTime) => {
    return shallow(
      <RequestCard 
        cacheKey={cacheKey}
        cacheTime={cacheTime}
        title="Foobar" 
        url="http://api.com/dog"
        onGetDataSuccess={onGetDataSuccess}
        onGetDataError={onGetDataError}
        refreshInterval={refreshInterval}>
        <p className="content">Content</p>
      </RequestCard>
    )
  }

  describe('when render', () => {
    request.get.mockImplementation(() => new Promise(jest.fn())) 
    const wrapper = getRequestCardWrapper()

    it('should have request-card class', () => {
      expect(wrapper.hasClass('request-card')).toEqual(true)
    })
    
    it('should have a title', () => {
      const cardProps = wrapper.find(Card).props()
      expect(cardProps.title).toEqual('Foobar')
    })
    
    it('should not call request get method with url when data is cached', () => {
      const cacheKey = 'dog'
      const cacheTime = 6000
      const beforeCacheTime = 8000
      const beforeDate = getTime(subMilliseconds(getTime(new Date()), beforeCacheTime))
      const nowDate = getTime(subMilliseconds(beforeDate, beforeCacheTime))
      
      request.get.mockClear()
      storage.get.mockReturnValue({ name: 'Lessie', updateAt: beforeDate})
      date.now.mockReturnValue(nowDate)
      getRequestCardWrapper(null, cacheKey, cacheTime)

      expect(request.get).not.toBeCalled()
    })

    it('should call request get method with url when cache is less than TTL', () => {
      const cacheKey = 'dog'
      const cacheTime = 120000
      const afterCacheTime = 130000
      const beforeDate = getTime(new Date())
      const nowDate = getTime(addMilliseconds(beforeDate, afterCacheTime))
      
      request.get.mockClear()
      storage.get.mockReturnValue({ name: 'Lessie', updateAt: beforeDate})
      date.now.mockReturnValue(nowDate)
      getRequestCardWrapper(null, cacheKey, cacheTime)
      
      expect(request.get).toHaveBeenCalledWith('http://api.com/dog')
    })
    
    it('should call request get method with url', () => {
      storage.get.mockReturnValue(false)
      getRequestCardWrapper(6000, 'dog', 7000)
      expect(request.get).toHaveBeenCalledWith('http://api.com/dog')
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
    request.get.mockImplementation(() => Promise.resolve(data))
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
    request.get.mockImplementation(() => Promise.reject(error))
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
      const fetchAction = wrapper.instance().fetchData
      
      expect(wrapper.contains(
        <Alert message="Something went wrong" retryAction={fetchAction}/>)
      ).toEqual(true)
    })
  })

  describe('when refresh interval', () => {
    request.get.mockImplementation(() => new Promise(jest.fn())) 
    const wrapper = getRequestCardWrapper(6000)

    it('should call get method with url', () => {
      request.get.mockClear()
      expect(request.get).not.toBeCalled()
    
      jest.runOnlyPendingTimers()
      expect(request.get).toHaveBeenCalledWith('http://api.com/dog')
    })

    it('should clear interval on unmount', () => {
      wrapper.unmount()
      expect(clearInterval).toHaveBeenCalled()
    })
  })

  describe('when refresh interval is not declared', () => {
    request.get.mockImplementation(() => new Promise(jest.fn())) 
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

  describe('when cache response data', () => {
    const data = { name: 'Lassie' }
    getRequestCardWrapper(6000, 'dog', 7000)
    request.get.mockImplementation(() => Promise.resolve(data))

    it('should set item on storage', () => {
      expect(storage.set).toHaveBeenCalledWith('dog', data)
    })
  })
})