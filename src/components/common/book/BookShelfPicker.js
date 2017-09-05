import React from 'react';
import { PropTypes } from 'prop-types';
import ReactDOM from 'react-dom'
import $ from 'jquery';

window['$'] = $;
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
     $((this.refs.select)).dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'right', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
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

        <a className='dropdown-button btn-floating btn-small waves-effect waves-light' ref="select" data-activates='dropdown1'><i className="material-icons">add</i></a>
        <ul id='dropdown1' className='dropdown-content'>
        {this.props.shelves.map( shelf =>
          <li key={ shelf.id }><a>{ shelf.name }</a></li>
        )}


      </ul>



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
