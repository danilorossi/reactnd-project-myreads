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
    ],
    bookShelfMappings: {
      // <bookId> : <shelf>
    }
  }

  constructor(props) {
    super(props)
    this.changeShelf = this.changeShelf.bind(this)
  }

  changeShelf(data) {

    const { book, newShelf } = data;

    BooksAPI
      .update(book, newShelf)
      .then(response => {
        // new book
        if(!book.shelf || book.shelf === 'none') {

          this.booksCache = [
            ...this.booksCache,
            Object.assign({}, book, { shelf: newShelf })
          ];

        } else if(newShelf === 'none') { // remove book from all shelves

          this.booksCache = this.booksCache.filter(b => b.id !== book.id)

        } else { // just change shelf

          this.booksCache = [
            ...this.booksCache.filter(b => b.id !== book.id),
            Object.assign({}, book, { shelf: newShelf })
          ];

        }

        this.createInitialState(this.booksCache);
      })
  }

  orderShelves(shelvesDictionary, validBookshelves) {
    return (shelvesDictionary && Object.keys(shelvesDictionary).length > 0) ?
      validBookshelves.map(
        bookshelf => ({
            id: bookshelf.id,
            name: bookshelf.name,
            books: shelvesDictionary[bookshelf.id] || []
        })
      ) : []
  }

  booksCache = null;

  componentDidMount() {
    BooksAPI
      .getAll()
      .then(booksCollection => {
        this.booksCache = booksCollection;
        this.createInitialState(this.booksCache);
      })
  }

  createInitialState(booksCollection) {
    const shelfToBooksMapping = reduceToDictionaryByField(booksCollection, 'shelf')

    const bookIdToShelfMapping = {};
    booksCollection.forEach(book => {
      bookIdToShelfMapping[book.id] = book.shelf;

    })

    const shelves = this.orderShelves(shelfToBooksMapping, VALID_BOOKSHELVES)
    this.setState({
      shelves,
      bookShelfMappings: bookIdToShelfMapping
    })
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" render={
            () => <HomePage changeShelf={this.changeShelf} shelves={this.state.shelves} />
          }/>
          <Route exact path="/search" render={
            () => <SearchPage changeShelf={this.changeShelf} bookShelfMappings={this.state.bookShelfMappings} /> }
          />
        </div>
      </Router>
    )
  }
}

export default BooksApp
