import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './App.css'

import { reduceToDictionaryByField } from './utils/arrayUtils.js'
import { VALID_BOOKSHELVES } from './constants/shelves'

import HomePage from './components/home/HomePage'
import SearchPage from './components/search/SearchPage'

import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {

  state = {

    shelves: [
      // { id, name, books }
    ]
  }

  changeShelf(book) {
    // TODO
    // remove book from current shelf
    // add it to new shelf
  }

  orderShelves(shelvesDictionary, validBookshelves) {
    return (shelvesDictionary && Object.keys(shelvesDictionary).length > 0) ?
      validBookshelves.map(
        bookshelf => ({
            id: bookshelf.id,
            name: bookshelf.name,
            books: shelvesDictionary[bookshelf.id]
        })
      ) : []
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then(booksCollection => {
        const shelvesDictionary = reduceToDictionaryByField(booksCollection, 'shelf')
        const shelves = this.orderShelves(shelvesDictionary, VALID_BOOKSHELVES)
        this.setState({
          shelves
        })
      })
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" render={ () => <HomePage shelves={this.state.shelves} /> }/>
          <Route exact path="/search" component={SearchPage}/>
        </div>
      </Router>
    )
  }
}

export default BooksApp
