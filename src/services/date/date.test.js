import date from './date'
import getTime from 'date-fns/get_time'
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds'

jest.mock('date-fns/get_time')
jest.mock('date-fns/difference_in_milliseconds')

describe('Date', () => {
  it('should call getTime from date-fns', () => {
    const currentDate = new Date()
    date.now(currentDate)
    expect(getTime).toHaveBeenCalledWith(currentDate)
  })

  it('should call differenceInMilliseconds from date-fns', () => {
    const currentDate = new Date()
    const otherDate = new Date()
    date.difference(currentDate, otherDate)
    expect(differenceInMilliseconds).toHaveBeenCalledWith(currentDate, otherDate)
  })
})