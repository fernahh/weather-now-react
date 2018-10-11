import React from 'react'
import PropTypes from 'prop-types'
import './alert.scss'
import Button from '../button/button'

function Alert(props) {
  return (
    <div className="alert">
      <p className="alert__message">{props.message}</p>
      <Button onClick={props.retryAction}>Try Again</Button>
    </div>
  )
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  retryAction: PropTypes.func.isRequired
}

export default Alert
