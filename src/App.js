import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './App.css'

import HomePage from './components/home/HomePage'
import SearchPage from './components/search/SearchPage'

import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {

  state = {
    booksCollection: []
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then(booksCollection => this.setState({ booksCollection }));
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" render={ () => <HomePage booksCollection={this.state.booksCollection} /> }/>
          <Route exact path="/search" component={SearchPage}/>
        </div>
      </Router>
    )
  }
}

export default BooksApp
