import React from 'react'
import { PropTypes } from 'prop-types'

class BookShelfPicker extends React.Component {
  render() {
    const shelvesOptions = this.props.shelves.map( shelf => ({
      id: shelf.replace(/\s/g,''),
      value: shelf
    }));

    return (
      <div className="book-shelf-changer">
        <select>
          <option value="none" disabled>Move to...</option>
          {shelvesOptions.map( option =>
            <option key={ option.id } value={ option.value }>{ option.value }</option>
          )}
        </select>
      </div>
    )
  }
}

BookShelfPicker.propTypes = {
  shelves: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default BookShelfPicker;
