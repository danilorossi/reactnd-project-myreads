import React from 'react'
import { PropTypes } from 'prop-types'

class BookShelfPicker extends React.Component {
  
  render() {
    return (
      <div className="book-shelf-changer">
        <select>
          <option value="none" disabled>Move to...</option>
          {this.props.shelves.map( shelf =>
            <option key={ shelf.id } value={ shelf.id }>{ shelf.name }</option>
          )}
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

BookShelfPicker.propTypes = {
  shelves: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired
};

export default BookShelfPicker;
