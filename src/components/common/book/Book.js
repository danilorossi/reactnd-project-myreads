import React from 'react';
import { PropTypes } from 'prop-types';

/** BookCover component */
import BookCover from './BookCover';

/** BookFooter component */
import BookFooter from './BookFooter';

/** BookShelfPicker component */
import BookShelfPicker from './BookShelfPicker';

/** List of valid shelves, in the order we want to show them in the homepage */
import { VALID_BOOKSHELVES } from '../../../constants/shelves';

/** React component that represents a Book. */
class Book extends React.Component {

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
    // Call the callback with the book data and the new shelf
    return this.props.changeShelf(this.props.book, shelf);
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

      <div className="card small">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={imageUrl}/>
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">{book.title}<i className="material-icons right">more_vert</i></span>
          <p>{book.authors}</p>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
          <p>{book.description}</p>
        </div>
      </div>
    )
  }


  //
  // <div className="book">
  //
  //   <div className="book-top">
  //
  //     {/* The book cover component */}
  //     <BookCover imageURL={imageUrl} />
  //
  //     {/*
  //       * The book shelf picker component.
  //       * Receives:
  //       * - the list of valid shelves
  //       * - the current shelf this book belongs to
  //       * - a callback to update the shelf
  //       */}
  //     <BookShelfPicker
  //       updateShelf={this.updateShelf}
  //       currentShelf={book.shelf}
  //       shelves={VALID_BOOKSHELVES} />
  //
  //   </div>
  //
  //   {/* The book footer component */}
  //   <BookFooter
  //     title={book.title}
  //     authors={book.authors} />
  //
  // </div>


}

/** PropTypes */
Book.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
};

export default Book;
