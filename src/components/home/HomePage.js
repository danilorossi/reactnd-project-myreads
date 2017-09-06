import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

/** BookShelf component */
import BookShelf from '../common/bookshelf/BookShelf';

/** List of valid shelves, to populate book picker component */
import { VALID_BOOKSHELVES } from '../../constants/shelves';

/** React main component for the home page. */
class HomePage extends React.Component {


  shelfPickerValues = [
      ...VALID_BOOKSHELVES,
      { id: 'none', name: 'None' }
    ];

  /**
  * @description render hook.
  */
  render() {

    return (
      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            {/* Loop over valid and sorted shelves */}
            {/* And draw it with the list of books */}
            { this.props.shelves && this.props.shelves.map(shelf => (
                <BookShelf
                  shelvesList={this.shelfPickerValues}
                  changeShelf={this.props.changeShelf}
                  key={shelf.id}
                  name={shelf.name}
                  books={shelf.books} />
                )
              )
            }
          </div>
        </div>

        <div className="open-search">
          {/* Navigate to search page */}
          <Link to="/search">Add a book</Link>
        </div>

      </div>
    )
  }

}
/** PropTypes */
HomePage.propTypes = {
  shelves: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      // TODO: better define the book object structure here
      books: PropTypes.arrayOf(PropTypes.object).isRequired
    })
  ).isRequired
};

export default HomePage;
