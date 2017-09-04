import React from 'react'
import { PropTypes } from 'prop-types'

class BookShelfPicker extends React.Component {

  state = {
    currentShelf: 'none'
  }

  constructor(props) {
    super(props)
    this.onShelfChange = this.onShelfChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      currentShelf: this.props.currentShelf || 'none'
    })
  }

  onShelfChange(event) {
    const newShelf = event.target.value
    this.props
      .updateShelf(newShelf)
      .then(newShelf => this.refs.select && this.setState({currentShelf: newShelf}))
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          ref="select"
          onChange={this.onShelfChange}
          value={this.state.currentShelf}>

          <option disabled>Move to...</option>
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
