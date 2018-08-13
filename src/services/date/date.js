import getTime from 'date-fns/get_time'
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds'

const difference = (initialDate, lastDate) => differenceInMilliseconds(initialDate, lastDate)

const now = () => getTime(new Date())

export default {
  difference,
  now
}