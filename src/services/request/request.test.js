import axios from 'axios'
import request from './request'

jest.mock('axios')

describe('Request', () => {
  describe('on get', () => {
    it('call get method from axios', () => {
      request.get('http://api.com/dog')
      expect(axios.get).toHaveBeenCalledWith('http://api.com/dog')
    })

    it('call get method from axios with params', () => {
      const params = { breed: 'beagle' }
      request.get('http://api.com/dog', params)
      expect(axios.get).toHaveBeenCalledWith('http://api.com/dog', {
        params
      })
    })
  })
})