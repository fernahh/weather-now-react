import getTime from 'date-fns/get_time'
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds'
import format from 'date-fns/format'

const difference = (initialDate, lastDate) => differenceInMilliseconds(initialDate, lastDate)

const formatTimestamp = ({ timestamp, formatType}) => {
  return format(new Date(timestamp), formatType)
}

const now = () => getTime(new Date())

export default {
  difference,
  formatTimestamp,
  now
}