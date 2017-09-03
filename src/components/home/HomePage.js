import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

import BookShelf from '../common/bookshelf/BookShelf'

class HomePage extends React.Component {

  render() {

    return (
      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            { this.props.shelves && this.props.shelves.map(shelf => (
              <BookShelf
                changeShelf={this.props.changeShelf}
                key={shelf.id}
                name={shelf.name}
                books={shelf.books} />
            ))}
          </div>
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>

      </div>
    )
  }

}

HomePage.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  shelves: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      books: PropTypes.arrayOf(PropTypes.object).isRequired // TODO define structure?
    })
  ).isRequired
};

export default HomePage;
