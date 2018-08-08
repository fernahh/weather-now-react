import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <h1>Hello world {process.env.REACT_APP_API_KEY}</h1>
    )
  }
}

export default App
