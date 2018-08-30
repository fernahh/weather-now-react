import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '../../components/card/card'
import Alert from '../../components/alert/alert'
import Loader from '../../components/loader/loader'
import storage from '../../services/storage/storage'
import request from '../../services/request/request'
import date from '../../services/date/date'

const cacheIsValid = (data, cacheTime) => {
  return data && date.difference(data.updateAt, date.now()) > cacheTime
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
    url: PropTypes.string.isRequired,
    urlParams: PropTypes.object
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
    this.setState({ showLoader: true })

    const cachedData = storage.get(this.props.cacheKey)
    const { urlParams } = this.props

    cacheIsValid(cachedData, this.props.cacheTime) 
      ? this.onFetchSuccess(cachedData)
      : request.get(this.props.url, { ...urlParams })
          .then(this.onFetchSuccess)
          .catch(this.onFetchError)
  }

  onFetchSuccess = (data) => {
    const updatedAt = date.now()
    const dataWithUpdateAt = Object.assign(data, { updatedAt })
    
    if (this.props.cacheKey) {
      storage.set(this.props.cacheKey, dataWithUpdateAt)
    }

    this.setState({ showLoader: false })
    this.props.onGetDataSuccess(dataWithUpdateAt)
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
          {showLoader && !showError && <Loader />}
          {showError && <Alert message={errorMessage} retryAction={this.fetchData}/>}
          {showChildren && children}
        </Card>
      </div>
    )
  }
}

export default RequestCard
