import React from 'react'
import { PropTypes } from 'prop-types'

import BookCover from './BookCover'
import BookFooter from './BookFooter'
import BookShelfPicker from './BookShelfPicker'
import { VALID_BOOKSHELVES } from '../../../constants/shelves'

class Book extends React.Component {

  render() {

    return (
      <div className="book">

        <div className="book-top">

          <BookCover imageURL={this.props.meta.imageURL} />

          <BookShelfPicker
            bookId={this.props.meta.id}
            changeShelf={this.props.changeShelf}
            currentShelf={this.props.meta.shelf}
            shelves={VALID_BOOKSHELVES} />

        </div>

        <BookFooter
          title={this.props.meta.title}
          authors={this.props.meta.authors} />

      </div>
    )
  }
}

Book.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  meta: PropTypes.shape({
    id: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    imageURL: PropTypes.string,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string)
  }).isRequired

};

export default Book;
