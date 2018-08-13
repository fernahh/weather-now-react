import date from '../date/date'

const get = (key) => localStorage.getItem(key)

const remove = (key) => localStorage.removeItem(key)

const set = (key, data) => localStorage.setItem(key, addUpdatedAt(data))

const addUpdatedAt = (data) => Object.assign(data, { updatedAt: date.now() })

export default {
  get,
  remove,
  set
}