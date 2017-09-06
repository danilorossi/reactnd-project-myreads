import React from 'react';
import { PropTypes } from 'prop-types';

/** React stateless functional component that represents a book cover. */
const BookCover = ({ imageWidth, imageHeight, imageURL, updating }) => {
  return (
    <div className="book-cover"
      style={{
        width: imageWidth,
        height: imageHeight,
        backgroundImage: `url("${imageURL}")`
      }}>
      {updating && <div className="updating">Updating...</div>}
    </div>
  )
};

/** PropTypes */
BookCover.propTypes = {
  updating: PropTypes.bool,
  imageURL: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
};

/** Default values */
BookCover.defaultProps = {
  updating: false,
  imageURL: '/assets/default-bookcover-thumb.jpg',
  imageWidth: 128,
  imageHeight: 193
};

export default BookCover;
