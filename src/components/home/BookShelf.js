import React from 'react'
import { PropTypes } from 'prop-types'

import Book from '../common/book/Book'

class BookShelf extends React.Component {

  render() {

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

              {this.props.books.map( book => (
                <li key={book.id}>
                  <Book
                    meta={{
                      imageURL: book.imageLinks.smallThumbnail,
                      title : book.title,
                      authors : book.authors
                    }} />
                </li>
              ))}

          </ol>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  name: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      imageLinks: PropTypes.object.isRequired, // TODO define object
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired
};

export default BookShelf;
