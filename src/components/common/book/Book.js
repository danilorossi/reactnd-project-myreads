import React from 'react'
import { PropTypes } from 'prop-types'

import BookCover from './BookCover'
import BookFooter from './BookFooter'
import BookShelfPicker from './BookShelfPicker'
import { bookshelfDefinition } from '../../../constants/bookshelf'

class Book extends React.Component {

  render() {

    return (
      <div className="book">

        <div className="book-top">

          <BookCover imageURL={this.props.meta.imageURL} />

          <BookShelfPicker
            shelves={bookshelfDefinition} />

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
    imageURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired

};

export default Book;
