import axios from 'axios'

const get = (url, params) => params ? axios.get(url, { params }) : axios.get(url)

export default {
  get
}