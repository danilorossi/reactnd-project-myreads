import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

/** BookShelf component */
import BookShelf from '../common/bookshelf/BookShelf';

/** React main component for the home page. */
class HomePage extends React.Component {

  /**
  * @description render hook.
  */
  render() {

    return (
      <div className="list-books">

        <nav>
          <div className="teal darken-3 nav-wrapper">
            <a className="brand-logo center"><i className="material-icons">bookmark</i> MyReads</a>
          </div>
        </nav>

        <div className="list-books-content">
            {/* Loop over valid and sorted shelves */}
            {/* And draw it with the list of books */}
            { this.props.shelves && this.props.shelves.map(shelf => (
                <BookShelf
                  changeShelf={this.props.changeShelf}
                  key={shelf.id}
                  name={shelf.name}
                  books={shelf.books} />
                )
              )
            }
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
