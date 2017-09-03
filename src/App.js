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
    // TODO and pass it to search page ? idToShelfMapping: {},
    shelves: [
      // { id, name, books }
    ],
    bookShelfMappings: {

    }
  }

  changeShelf(book) {
    // TODO
    // remove book from current shelf
    // add it to new shelf
    // ? update idToShelfMapping ?
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

        const shelfToBooksMapping = reduceToDictionaryByField(booksCollection, 'shelf')

        const bookIdToShelfMapping = {};
        booksCollection.forEach(book => {
          bookIdToShelfMapping[book.id] = book.shelf;

        })

        console.log('shelfToBooksMapping', shelfToBooksMapping);
        console.log('bookIdToShelfMapping', bookIdToShelfMapping);

        const shelves = this.orderShelves(shelfToBooksMapping, VALID_BOOKSHELVES)
        this.setState({
          shelves,
          bookShelfMappings: bookIdToShelfMapping
        })
      })
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" render={ () => <HomePage shelves={this.state.shelves} /> }/>
          <Route exact path="/search" render={ () => <SearchPage bookShelfMappings={this.state.bookShelfMappings} /> }/>
        </div>
      </Router>
    )
  }
}

export default BooksApp
