import React from 'react';
import { PropTypes } from 'prop-types';

/** Book component */
import Book from '../book/Book';

/**
 * React stateless functional component component that represents a BookShelf,
 * with a title and a list of books.
 */
const BookShelf = ({ name, books, changeShelf, shelvesList }) => {
  return (
    <div className="bookshelf">

      {/* The bookshelf name */}
      { name && <h2 className="bookshelf-title">{ name }</h2>}

      <div className="bookshelf-books">
        <ol className="books-grid">

          {/* Draw the books */}
          {books.map( book => (
            <li key={book.id}>
              <Book
                shelvesList={ shelvesList }
                changeShelf={ changeShelf }
                book={ book } />
            </li>
          ))}

        </ol>
      </div>
    </div>
  )
}

/** PropTypes */
BookShelf.propTypes = {
  name: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeShelf: PropTypes.func.isRequired,
  shelvesList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired
};

export default BookShelf;
