import React from 'react'
import { PropTypes } from 'prop-types'

import BookCover from './BookCover'
import BookFooter from './BookFooter'
import BookShelfPicker from './BookShelfPicker'

class Book extends React.Component {

  state = {
    shelves: [{
        id: 'currentlyReading',
        name: 'Currently Reading'
      }, {
        id: 'wantToRead',
        name: 'Want to Read'
      }, {
        id: 'read',
        name: 'Read'
      }]
  }

  render() {
    return (
      <div className="book">

        <div className="book-top">

          <BookCover imageURL={this.props.meta.imageURL} />

          <BookShelfPicker
            shelves={this.state.shelves} />

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
