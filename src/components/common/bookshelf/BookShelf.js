import React from 'react'
import { PropTypes } from 'prop-types'

import Book from '../book/Book'

class BookShelf extends React.Component {

  render() {

    return (
      <div className="bookshelf">
        {this.props.name && <h2 className="bookshelf-title">{this.props.name}</h2>}
        <div className="bookshelf-books">
          <ol className="books-grid">

              {this.props.books.map( book => ( // TODO get the fields in a smarter way
                <li key={book.id}>
                  <Book
                    changeShelf={this.props.changeShelf}
                    meta={{
                      id: book.id,
                      shelf: book.shelf,
                      imageURL: book.imageLinks ? book.imageLinks.smallThumbnail : undefined,
                      title   : book.title,
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
  name: PropTypes.string,
  books: PropTypes.arrayOf(
    // TODO default thumbnail
    PropTypes.shape({ // TODO these are 'AT LEAST' props
      // id: PropTypes.string.isRequired,
      // shelf: PropTypes.string.isRequired,
      imageLinks: PropTypes.shape({
        smallThumbnail: PropTypes.string
      }),
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default BookShelf;
