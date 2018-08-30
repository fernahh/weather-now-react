import date from './date'
import getTime from 'date-fns/get_time'
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds'
import format from 'date-fns/format'

jest.mock('date-fns/get_time')
jest.mock('date-fns/difference_in_milliseconds')
jest.mock('date-fns/format')

describe('Date', () => {
  it('call getTime from date-fns', () => {
    const currentDate = new Date()
    date.now(currentDate)
    expect(getTime).toHaveBeenCalled()
  })

  it('call differenceInMilliseconds from date-fns', () => {
    const currentDate = new Date()
    const otherDate = new Date()
    date.difference(currentDate, otherDate)
    expect(differenceInMilliseconds).toHaveBeenCalledWith(currentDate, otherDate)
  })

  it('call format from date-fns', () => {
    const timestamp = Date.now()
    const formatType = 'hh:mm:ss A'
    date.formatTimestamp({timestamp, formatType})
    expect(format).toHaveBeenCalledWith(new Date(timestamp), formatType)
  })
})