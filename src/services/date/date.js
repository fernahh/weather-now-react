import getTime from 'date-fns/get_time'
import differenceInMinutes from 'date-fns/difference_in_minutes'


const difference = (initialDate, lastDate) => differenceInMinutes(initialDate, lastDate)

const now = () => getTime(new Date())

export default {
  difference,
  now
}