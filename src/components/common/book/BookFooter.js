import React from 'react'
import { PropTypes } from 'prop-types'

class BookFooter extends React.Component {
  render() {
    return (
      <div className="book-footer">
        <div className="book-title">{ this.props.title }</div>
        {this.props.authors.map( (author, i) => <div key={i} className="book-authors">{ author }</div> )}
      </div>
    )
  }
}

BookFooter.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
};

export default BookFooter;
