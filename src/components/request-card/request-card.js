import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '../card/card'
import Loader from '../loader/loader'
import Alert from '../alert/alert'

class RequestCard extends Component {
  static defaultProps = {
    errorMessage: 'Something went wrong'
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    errorMessage: PropTypes.string,
    fetch: PropTypes.func.isRequired,
    retryAction: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }

  state = {
    showError: false,
    showLoader: true
  }

  componentDidMount() {
    this.props.fetch().then(this.onFetchSuccess, this.onFetchError)
  }

  onFetchSuccess = () => {
    this.setState({
      showLoader: false
    })
  }

  onFetchError = () => {
    this.setState({
      showLoader: false,
      showError: true
    })
  }

  render() {
    const { showLoader, showError } = this.state
    const { children, errorMessage, title, retryAction } = this.props
    const showChildren = !showLoader && !showError

    return (
      <div className="request-card">
        <Card title={title}>
          {showLoader && <Loader />}
          {showError && <Alert message={errorMessage} retryAction={retryAction}/>}
          {showChildren && children}
        </Card>
      </div>
    )
  }
}

export default RequestCard
