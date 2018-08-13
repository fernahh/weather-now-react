import storage from './storage'
import date from '../date/date'

jest.mock('../date/date')

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
}
global.localStorage = localStorageMock

describe('Storage', () => {
  const now = new Date()
  date.now.mockReturnValueOnce(now)
  
  const key = 'dog';
  const data = { name: 'Lessie', updatedAt: now }
  const dog = { name: 'Lessie' }

  it('should set data with updatedAt', () => {
    storage.set(key, dog)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, data)
  })

  it('should get data', () => {
    storage.get(key)
    expect(localStorage.getItem).toHaveBeenCalledWith(key)
  })

  it('should remove data', () => {
    storage.remove(key)
    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
  })
})