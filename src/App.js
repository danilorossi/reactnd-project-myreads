import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './App.css'

import HomePage from './components/home/HomePage'
import SearchPage from './components/search/SearchPage'

class BooksApp extends React.Component {

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" component={HomePage} /> }/>
          <Route exact path="/search" component={SearchPage}/>
        </div>
      </Router>
    )
  }
}

export default BooksApp
