import React from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from '../../BooksAPI'
import BookShelf from '../common/bookshelf/BookShelf'

import { debounce } from '../../utils/decorators'

class SearchPage extends React.Component {

  state = {
    query: '',
    books: []
  }

  constructor(props) {
    super(props)
    this.onQueryChange = this.onQueryChange.bind(this)
    this.searchBooks = debounce(500)(this.searchBooks)
  }

  componentDidMount() {

  }

  searchBooks(query) {
    BooksAPI
      .search(query, 20) // TODO invalid keyword return error or forbidden?
      .then(books => {
        console.log(books)
        if(books.error) {
          console.warn(books.error)
          return;
        }
        this.setState({ books })
      })
      .catch(err => console.warn('CATCH', err))
  }

  onQueryChange(event) {
    const query = event.target.value ? event.target.value : ''
    this.setState({ query });
    if(query.trim().length > 0) {
      this.searchBooks(query)
    } else {
      this.setState({ books: '' });
    }


  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.onQueryChange}/>

          </div>
        </div>
        <div className="search-books-results">

          { this.state.books && <BookShelf books={this.state.books} /> }
          { /* TODO indicate loading and no results */}
        </div>
      </div>
    )
  }
}

export default SearchPage;
