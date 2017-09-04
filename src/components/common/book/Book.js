import React from 'react'
import { PropTypes } from 'prop-types'

import BookCover from './BookCover'
import BookFooter from './BookFooter'
import BookShelfPicker from './BookShelfPicker'
import { VALID_BOOKSHELVES } from '../../../constants/shelves'

class Book extends React.Component {
  constructor(props){
    super(props)
    this.updateShelf = this.updateShelf.bind(this)
  }
  render() {
    const book = this.props.book;
    const imageUrl = book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : undefined

    return (
      <div className="book">

        <div className="book-top">

          <BookCover
            imageURL={imageUrl} />

          <BookShelfPicker
            updateShelf={this.updateShelf}
            currentShelf={book.shelf}
            shelves={VALID_BOOKSHELVES} />

        </div>

        <BookFooter
          title={book.title}
          authors={book.authors} />

      </div>
    )
  }

  updateShelf(shelf) {
    return this.props.changeShelf({
      newShelf: shelf,
      book: this.props.book
    })
  }
}

Book.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired

};

export default Book;
