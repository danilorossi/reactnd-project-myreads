import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

import BookShelf from './BookShelf'

import { reduceToDictionaryByField } from '../../utils/arrayUtils.js'
import { bookshelfDefinition } from '../../constants/bookshelf'

class HomePage extends React.Component {

  getShelves(bookshelfDefinition, booksCollection = []) {
    if(!booksCollection) return [];

    const dictionary = reduceToDictionaryByField(booksCollection, 'shelf');

    let shelves = [];
    bookshelfDefinition.forEach( bookshelf => {
      const books = [];
      dictionary[bookshelf.id].forEach( book => { books.push(book) } )
      shelves.push({
        id: bookshelf.id,
        name: bookshelf.name,
        books
      })
    })

    return shelves;
  }

  render() {

    const shelves = this.props.booksCollection.length > 0 ?
      this.getShelves(bookshelfDefinition, this.props.booksCollection) : null;

    return (
      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            { shelves && shelves.map( shelf => (
              <BookShelf key={shelf.id} name={shelf.name} books={shelf.books}/>)
            )}
          </div>
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>

      </div>
    )
  }

}

HomePage.propTypes = {
  booksCollection: PropTypes.array.isRequired
};

export default HomePage;
