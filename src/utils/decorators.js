/**
* @description A debounce decorator.
* @param {number} wait - Debounce delay: the function will be called after
*                        it stops being called for <wait> milliseconds.
* @param {boolean} immediate - If true, trigger the function on the
*                              leading edge, instead of the trailing.
* @returns {function} A decorator function that accepts the function to be debounced.
*/
export function debounce(wait, immediate) {

  // The decorator function
  return function decorator (func) {

    // setTimeout reference
    var timeout;

    // The decorated function
    return function() {

      // Save context and args for later calling
      let context = this,
          args = arguments,
          callNow = immediate && !timeout;

      // Stops the timeout
      clearTimeout(timeout);

      // Set the timeout
      timeout = setTimeout(function() {

          // Reset the timer reference
          timeout = null;

          // Default case, not immediate, fire the function
          if (!immediate) {
            func.apply(context, args);
          }

        }, wait || 200); // Wait specified ms or default to 200ms

      // Immediate case
      if (callNow) {
        func.apply(context, args);
      }
    };
  }
}
