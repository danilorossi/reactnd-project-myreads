import React from 'react';
import { PropTypes } from 'prop-types';

/** BookCover component */
import BookCover from './BookCover';

/** BookFooter component */
import BookFooter from './BookFooter';

/** BookShelfPicker component */
import BookShelfPicker from './BookShelfPicker';

/** React component that represents a Book. */
class Book extends React.Component {

  /** Component state */
  state = {
    updating: false // On shelf change, disable picker and notify user while we get a response
  }

  /**
  * @description Book React component
  * @constructor
  * @param {object} props - React props
  */
  constructor(props){
    // Super constructor
    super(props);
    // Bind to the current context
    this.updateShelf = this.updateShelf.bind(this);
  }

  /**
  * @description Update this book shelf.
  * @param {string} shelf - The new shelf ID for this book.
  * @returns {Promise} A promise that resolves with the new updated shelf
  */
  updateShelf(shelf) {
    // Mark book as updating
    this.setState({ updating: true });

    return new Promise((resolve, reject) => {
      // Call the callback with the book data and the new shelf
      this.props.changeShelf(this.props.book, shelf)
        .then(payload => {
            // No more updating
            this.refs.root && this.setState({ updating: false });
            // Pass shelf down to bookshelf
            resolve(payload);
        })
        .catch(err => {
          // In case of any error, simply show no results message and log error
          console.error('Error while updating the shelf', err);
          this.setState({ updating: false });
          reject(err);
        })
    });

  }

  /**
  * @description render hook.
  */
  render() {

    // Ref for book prop
    const book = this.props.book;

    // Set default image if no imageLinks are given
    const imageUrl = book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : undefined;

    return (

      <div ref="root" className="book">

        <div className="book-top">

          {/* The book cover component */}
          <BookCover updating={this.state.updating} imageURL={imageUrl} />

          {/*
            * The book shelf picker component.
            * Receives:
            * - the list of valid shelves
            * - the current shelf this book belongs to
            * - a callback to update the shelf
            */}
          <BookShelfPicker
            updating={this.state.updating}
            updateShelf={this.updateShelf}
            currentShelf={book.shelf}
            shelves={this.props.shelvesList} />

        </div>

        {/* The book footer component */}
        <BookFooter
          title={book.title}
          authors={book.authors} />

      </div>
    )
  }


}

/** PropTypes */
Book.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  shelvesList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired,
};

export default Book;
