import React from 'react'
import PropTypes from 'prop-types'

function Button(props) {
  const type = props.type || 'button'

  return <button {...props} className="button" type={type}></button>
}

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
}

export default Button
