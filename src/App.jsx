import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { HomePage } from 'containers/home'
import { CityDetails } from 'containers/city-details'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/city/:city' component={CityDetails} />
        <Route path='/' component={HomePage} />
      </Switch>
    </Router>
  )
}
