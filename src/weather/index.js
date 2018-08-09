import React, { Component } from 'react'
import Topbar from '../components/topbar/topbar'
import Card from '../components/card/card'
import Loader from '../components/loader/loader'

class Weather extends Component {
  render() {
    return (
      <div>
        <Topbar />
        <Card title="Urubici, BR">
          <p> aoskdpaoksd okaspdkpsk</p>
        </Card>
        <Loader />
      </div>
    )
  }
}

export default Weather
