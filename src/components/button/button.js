import React from 'react'
import PropTypes from 'prop-types'
import './button.css'

function Button(props) {
  return <button {...props} className="button" type={props.type}></button>
}

Button.defaultProps = {
  type: 'button'
}

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
}

export default Button
