import React from 'react';
import { PropTypes } from 'prop-types';

/** Book component */
import Book from '../book/Book';

/**
 * React stateless functional component component that represents a BookShelf,
 * with a title and a list of books.
 */
const BookShelf = ({ name, books, changeShelf }) => {
  return (
    <div>

      {/* The bookshelf name */}
      { name && (
        <nav>
          <div className="teal lighten-3 nav-wrapper">
            <a className="brand-logo center">{ name }</a>
          </div>
        </nav>
      )}


      <div className="row">

        {/* Draw the books */}
        {books.map( book => (
          <div className="col" key={book.id}>
            <Book
              changeShelf={ changeShelf }
              book={book} />
          </div>
        ))}

      </div>


    </div>
  )
}

/** PropTypes */
BookShelf.propTypes = {
  name: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default BookShelf;
