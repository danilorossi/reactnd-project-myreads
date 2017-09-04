import React from 'react'
import { PropTypes } from 'prop-types'

/** React stateless functional component that represents a footer. */
const BookFooter = ({ title, authors }) => {
  return (
    <div className="book-footer">
      <div className="book-title">{ title }</div>
      <div className="book-authors">{ authors.join(', ') }</div>
    </div>
  )
}

/** PropTypes */
BookFooter.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
};

/** Default values */
BookFooter.defaultProps = {
  authors: ['Unknown author']
};

export default BookFooter;
