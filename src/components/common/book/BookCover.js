import React from 'react'
import { PropTypes } from 'prop-types'

class BookCover extends React.Component {

  render() {
    return (
      <div className="book-cover"
        style={{
          width: this.props.imageWidth,
          height: this.props.imageHeight,
          backgroundImage: `url("${ this.props.imageURL }")`
        }}>
      </div>
    )
  }
}

BookCover.propTypes = {
  imageURL: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
};

BookCover.defaultProps = {
  imageURL: '/assets/default-bookcover-thumb.jpg',
  imageWidth: 128,
  imageHeight: 193
};

export default BookCover;
