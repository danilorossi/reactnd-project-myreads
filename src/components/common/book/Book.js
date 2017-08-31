import React from 'react'
import { PropTypes } from 'prop-types'

import BookCover from './BookCover'
import BookFooter from './BookFooter'
import BookShelfPicker from './BookShelfPicker'

class Book extends React.Component {

  render() {
    return (
      <div className="book">

        <div className="book-top">

          <BookCover imageURL={this.props.imageURL} />

          <BookShelfPicker
            shelves={[
              'Currently Reading',
              'Want to Read',
              'Read',
              'None'
            ]} />

        </div>

        <BookFooter
          title={this.props.title}
          authors={this.props.authors} />

      </div>
    )
  }
}

Book.propTypes = {
  imageURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.string.isRequired
};

export default Book;
