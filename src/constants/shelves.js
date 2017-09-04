/** This is the place where we define WHICH shelves to show in the UI,
 *  their order, and the valid shelves for the shelf picker.
 *  If at some point BooksAPI started returning new shelves, we could just
 *  add them here, and we would have them appear in the main page, and selectable
 *  in the shelves picker, without touching the markup or the other components.
 *  NOTE: IDs are valid values of book.shelf as received from BookAPI
 *  NOTE: it´s const, but if we wanted to avoid manipulation of the array we should
 *  do more than that e.g. using a closure, or defining
 *  each shelf as a const and freeze/seal the object
 */
export const VALID_BOOKSHELVES = [{
    id: 'currentlyReading',
    name: 'Currently Reading'
  }, {
    id: 'wantToRead',
    name: 'Want to Read'
  }, {
    id: 'read',
    name: 'Read'
  }];
