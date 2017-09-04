import React from 'react';
import { PropTypes } from 'prop-types';

/** React component that represents the shelf picker control. */
class BookShelfPicker extends React.Component {

  /** Picker state to maintain current shelf */
  state = {
    currentShelf: 'none'
  }

  /**
  * @description BookShelfPicker React component
  * @constructor
  * @param {object} props - React props
  */
  constructor(props) {
    // Super constructor
    super(props);
    // Bind to the current context
    this.onShelfChange = this.onShelfChange.bind(this);
  }

  /**
  * @description componentDidMount hook.
  */
  componentDidMount() {
    // Set current selected shelf on the picker
    this.setState({
      currentShelf: this.props.currentShelf || 'none'
    });
  }

  /**
  * @description Change the shelf for the current book.
  * @param {Object} event - The select onChange event.
  */
  onShelfChange(event) {
    // Get the new shelf
    const newShelf = event.target.value;
    // Save the changeShelf
    this.props
      // Notify main state
      .updateShelf(newShelf)
      // And update state when RPC goes well
      // to maintain consistency
      .then(newShelf => this.refs.select && this.setState({currentShelf: newShelf}));
  }

  /**
  * @description render hook.
  */
  render() {
    return (
      <div className="book-shelf-changer">

        {/* Shelves select */}
        <select
          ref="select"
          onChange={this.onShelfChange}
          value={this.state.currentShelf}>

          {/* Disable option used as a title for the dropdown */}
          <option disabled>Move to...</option>
          {/* Dynamically build select using valid shelves */}
          {this.props.shelves.map( shelf =>
            <option key={ shelf.id } value={ shelf.id }>{ shelf.name }</option>
          )}
          {/* Default value for books that do not belong to any shelf */}
          <option value="none">None</option>

        </select>

      </div>
    )
  }
}

/** PropTypes */
BookShelfPicker.propTypes = {
  currentShelf: PropTypes.string.isRequired,
  shelves: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired,
  updateShelf: PropTypes.func.isRequired
};

export default BookShelfPicker;
