import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

/** API for books endpoints */
import * as BooksAPI from '../../BooksAPI';

/** List of valid shelves, to populate book picker component */
import { VALID_BOOKSHELVES } from '../../constants/shelves';

/** BookShelf component */
import BookShelf from '../common/bookshelf/BookShelf';

/** Debounce decorator to manage search API calls */
import { debounce } from '../../utils/decorators';

/** React main component for the search page. */
class SearchPage extends React.Component {

  /** Search page centralised state */
  state = {
    query: '', // Current search query
    books: [], // Current search results
    noBooksFound: false // Empty results set flag
  };

  /**
  * @description SearchPage React component
  * @constructor
  * @param {object} props - React props
  */
  constructor(props) {
    // Super constructor
    super(props);
    // Bind to the current context
    this.onQueryChange = this.onQueryChange.bind(this);
    this.updateResultsSet = debounce(200)(this.updateResultsSet);
  };

  /**
  * @description componentDidMount hook.
  */
  componentDidMount(){
    // Default focus on input search when showing the page
    this.queryInput.focus();
  }

  /**
  * @description Perform a search with the specified criteria.
  * @param {string} query - The search criteria.
  */
  updateResultsSet(query) {

    // Clear the no results found message
    this.setState({ noBooksFound: false });

    // call the search API endpoints with the query param
    BooksAPI
      .search(query, 20)
      .then(books => {
        // If error (e.g. books not found, this depends on the API)
        if(books.error) {
          // Empty results set, notify the user
          this.setState({ books: [], noBooksFound: true });
          return;
        }
        // If we have results, we match the results set
        // with the information about the shelves they belong to,
        // so that the search page is consistent with the home page
        this.setState({
          books: books.map(
            book => Object.assign({}, book, { shelf: this.props.bookShelfMappings[book.id] || 'none' })
          )
        });
      })
      .catch(err => {
        // In case of any error, simply show no results message and log error
        console.error('Error while searching', err);
        this.setState({ books: [], noBooksFound: true });
      })
  }

  /**
  * @description Callback for search criteria input field.
  * @param {object} event - The onChange event from the input field.
  */
  onQueryChange(event) {
    // Set the specified criteria, or at least an empty (valid) one
    const query = event.target.value ? event.target.value : '';
    // Update the state with the query, in order to actually update the UI
    this.setState({ query });
    // If not only spaces
    if(query.trim().length > 0) {
      // Perform the query and update the state
      this.updateResultsSet(query)
    } else {
      // Otherwise, set to empty string
      this.setState({ books: '' });
    }
  }

  /**
  * @description render hook.
  */
  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">

          {/* Navigate back to home page */}
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              TODO: help the user filtering the list of valid criteria
            */}

            {/* We use ref attribute to give focus in componentDidMount */}
            <input
              type="text"
              placeholder="Search by title or author"
              ref={ input => { this.queryInput = input }}
              value={this.state.query}
              onChange={this.onQueryChange}/>

          </div>
        </div>
        <div className="search-books-results">

          {/* We reuse the BookShelf component without the title to show the results */}
          { this.state.books && <BookShelf shelvesList={VALID_BOOKSHELVES} changeShelf={this.props.changeShelf} books={this.state.books} /> }

          {/* Show a message for empty results set */}
          { this.state.noBooksFound &&
            <div className="no-books-found-message">
              <span>No books found!</span>
            </div>
          }

        </div>
      </div>
    )
  }
}

/** PropTypes */
SearchPage.propTypes = {
  changeShelf: PropTypes.func.isRequired
}

export default SearchPage;
