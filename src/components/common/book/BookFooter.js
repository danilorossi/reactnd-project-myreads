import React from 'react'
import { PropTypes } from 'prop-types'

class BookFooter extends React.Component {
  render() {
    return (
      <div className="book-footer">
        <div className="book-title">{ this.props.title }</div>
        <div className="book-authors">{ this.props.authors.join(', ') }</div>
      </div>
    )
  }
}

BookFooter.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
};


BookFooter.defaultProps = {
  authors: ['Unknown author']
};

export default BookFooter;
