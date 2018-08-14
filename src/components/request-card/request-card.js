import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '../card/card'
import Alert from '../alert/alert'
import Loader from '../loader/loader'
import storage from '../../services/storage/storage'
import request from '../../services/request/request'
import date from '../../services/date/date'

const cacheIsValid = (data, cacheTime) => {
  return date.difference(data.updateAt, date.now()) > cacheTime
}

class RequestCard extends Component {
  static defaultProps = {
    errorMessage: 'Something went wrong'
  }

  static propTypes = {
    cacheKey: PropTypes.string,
    cacheTime: PropTypes.number,
    children: PropTypes.element.isRequired,
    errorMessage: PropTypes.string,
    onGetDataSuccess: PropTypes.func.isRequired,
    onGetDataError: PropTypes.func.isRequired,
    refreshInterval: PropTypes.number,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }

  state = {
    showError: false,
    showLoader: true
  }

  componentDidMount() {
    this.fetchData()    

    if (this.props.refreshInterval)
      this.interval = setInterval(this.fetchData, this.props.refreshInterval)
  }

  componentWillUnmount() {
    if (this.interval)
      clearInterval(this.interval)
  }

  fetchData = () => {
    this.setState({
      showLoader: true
    })

    const data = storage.get(this.props.cacheKey)

    if (data && cacheIsValid(data, this.props.cacheTime)) {
      this.onFetchSuccess(data)
    } else {
      request.get(this.props.url)
        .then(this.onFetchSuccess)
        .catch(this.onFetchError)
    }
  }

  onFetchSuccess = (data) => {
    this.setState({
      showLoader: false
    })
    this.props.onGetDataSuccess(data)

    if (this.props.cacheKey)
      storage.set(this.props.cacheKey, data)
  }

  onFetchError = (error) => {
    this.setState({
      showLoader: false,
      showError: true
    })
    this.props.onGetDataError(error)
  }

  render() {
    const { showLoader, showError } = this.state
    const { children, errorMessage, title } = this.props
    const showChildren = !showLoader && !showError

    return (
      <div className="request-card">
        <Card title={title}>
          {showLoader && <Loader />}
          {showError && <Alert message={errorMessage} retryAction={this.fetchData}/>}
          {showChildren && children}
        </Card>
      </div>
    )
  }
}

export default RequestCard
