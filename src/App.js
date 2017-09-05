import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './App.css';

/** Utility method used to organise books into shelves */
import { reduceToDictionaryByField } from './utils/arrayUtils.js';

/** List of valid shelves, in the order we want to show them in the homepage */
import { VALID_BOOKSHELVES } from './constants/shelves';

/** HomePage component */
import HomePage from './components/home/HomePage';
/** SearchPage component */
import SearchPage from './components/search/SearchPage';

/** API for books endpoints */
import * as BooksAPI from './BooksAPI';

/** React application entry point. */
class BooksApp extends React.Component {

  /** BookApp centralised state: all info about books and shelves
  * is stored here and passed down to the children components.
  */
  state = {

    // Array of shelves, each one with its UI name and list of boox
    shelves: [
      // { 'wantToRead', 'Want to Read', [...] }
    ],
    // Dictionary that maps each book to its current shelf
    bookShelfMappings: {
      // 'id1' : 'read', 'id2': 'wantToRead'
    }
  }

  /** Utility variable to keep the list of the user's book */
  booksCache = null;

  /**
  * @description BooksApp React component
  * @constructor
  * @param {object} props - React props
  */
  constructor(props) {
    // Super constructor
    super(props);
    // Bind to the current context
    this.changeShelf = this.changeShelf.bind(this);
  }

  /**
  * @description Update a book's shelf in the backend.
  * @param {Object} book - The book that is being moved to a new shelf.
  * @param {string} newShelf - The new shelf ID.
  * @returns {Promise} A promise that resolves with the new updated shelf
  */
  changeShelf(book, newShelf) {

    return new Promise((resolve, reject) => {

      BooksAPI
        .update(book, newShelf) // First we save the change on the backend
        .then(response => { // Then, we update our UI

          // First, we update our books utility variable (this.booksCache) that stores
          // the user's books: we will use this variable in a moment to create
          // the data structures we need in order update the UI in a consistent way.

          // CASE 1: It's a book that wasn't in our library before
          if(!book.shelf || book.shelf === 'none') {
            // Add it, setting the right shelf for it
            this.booksCache = [
              ...this.booksCache,
              Object.assign({}, book, { shelf: newShelf })
            ];
          } else if(newShelf === 'none') { // CASE 2: Removing a book from our shelves
            // Remove the book
            this.booksCache = this.booksCache.filter(b => b.id !== book.id);
          } else { // CASE 3: just changing shelf
            // Update the shelf property
            this.booksCache = [
              ...this.booksCache.filter(b => b.id !== book.id),
              Object.assign({}, book, { shelf: newShelf })
            ];
          }
          // This method will create the component state by organising
          // the list of books in a way that we can easily draw the UI we need
          this.createInitialState(this.booksCache);

          // Resolve the new shelf: will be used by the shelf picker control
          // to update its state once the update is succesful (BookShelfPicker)
          resolve(newShelf);
        })
    })
  }

  /**
  * @description Create an array of sorted shelves (to match the order
  *               we want in the UI) with the corresponding books list.
  * @param {Object} shelvesDictionary - A dictionary that matches each shelf id with a list of books.
  * @param {Array} validBookshelves - A sorted list of valid shelves and their UI names.
  * @returns {Array} An array of shelves, used by the UI, where each item specify shelf id, UI name and a list of books
  */
  orderShelves(shelvesDictionary, validBookshelves) {
    // If the dictionary is valid and there is at least one shelf
    return (shelvesDictionary && Object.keys(shelvesDictionary).length > 0) ?
      // Use the reference valid shelves array to create the new data structure
      validBookshelves.map(
        bookshelf => ({
            id: bookshelf.id,
            name: bookshelf.name,
            books: shelvesDictionary[bookshelf.id] || []
        })
      ) : []
  }


  /**
  * @description componentDidMount hook.
  */
  componentDidMount() {
    // Fetch all the books
    BooksAPI
      .getAll()
      .then(booksCollection => {
        // Save the list so that we can easily update the UI
        // when we start moving books from a shelf to another
        this.booksCache = booksCollection;
        // Create the state we need to easily draw our UI
        this.createInitialState(this.booksCache);
      });
  }

  /**
  * @description Create the React state needed to specifically draw our
  * @param {Object} shelvesDictionary - A dictionary that matches each shelf id with a list of books.
  * @param {Array} validBookshelves - A sorted list of valid shelves and their UI names.
  * @returns {Array} An array of shelves, used by the UI, where each item specify shelf id, UI name and a list of books.
  */
  createInitialState(booksCollection) {

    // BooksCollection is a list of books, but as we have different shelves, we
    // need a list of books by shelf. Plus, I decided not to hard code the shelves
    // in the UI and in the books' shelf picker, so that we can easily manage new shelves
    // or a different shelves order in the UI. That's the reason why we manipulate the
    // original books list in the following way.

    // From the books list, get an object that, for each shelf ID, stores an array
    // of books that belong to that shelf
    const shelfToBooksMapping = reduceToDictionaryByField(booksCollection, 'shelf');

    // Also, let's store an object that maps all books' ID to their shelf ID,
    // which will be used in the SearchPage, where the results do not include
    // the information about the current shelf
    const bookIdToShelfMapping = {};
    booksCollection.forEach(book => {
      bookIdToShelfMapping[book.id] = book.shelf;
    })

    // Finally we create a list of shelves that React can iterate over, to simplify
    // the HomePage component logic. All of this is neede because the order and types of
    // shelf are defined by the VALID_BOOKSHELVES object, instead of having JSX hardcoded
    // shelves
    const shelves = this.orderShelves(shelfToBooksMapping, VALID_BOOKSHELVES);

    // Finally set the component's state
    this.setState({
      shelves,
      bookShelfMappings: bookIdToShelfMapping
    });
  }

  /**
  * @description render hook.
  */
  render() {
    return (
      <Router>
        <div className="app">
          {/* We use the render property as we need to pass some props */}
          <Route exact path="/" render={
            () => <HomePage changeShelf={this.changeShelf} shelves={this.state.shelves} />
          }/>
          <Route exact path="/search" render={
            () => <SearchPage changeShelf={this.changeShelf} bookShelfMappings={this.state.bookShelfMappings} /> }
          />
          <footer className="teal darken-3 page-footer">
             <div className="container">
               <div className="row">
                 <div className="col l6 s12">
                   <h5 className="white-text">Footer Content</h5>
                   <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
                 </div>
                 <div className="col l4 offset-l2 s12">
                   <h5 className="white-text">Links</h5>
                   <ul>
                     <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                     <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                     <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                     <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                   </ul>
                 </div>
               </div>
             </div>
             <div className="footer-copyright">
               <div className="container">
               © 2014 Copyright Text
               <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
               </div>
             </div>
           </footer>
        </div>
      </Router>
    );
  }
}

export default BooksApp;
