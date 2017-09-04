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
                    book={book} />
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
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default BookShelf;
