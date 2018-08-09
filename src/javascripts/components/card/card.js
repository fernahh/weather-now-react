import React from 'react'
import PropTypes from 'prop-types'

function Card(props) {
  return (
    <article className="card">
      <header className="card__header">
        <h1 className="card__title">{props.title}</h1>
      </header>
      <section className="card__content">
        {props.children}
      </section>
    </article>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired
}

export default Card
