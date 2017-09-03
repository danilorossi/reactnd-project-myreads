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

  meta: PropTypes.shape({
    id: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired

};

export default Book;
