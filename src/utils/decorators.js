// function debounce(func, wait, immediate) {
// 	var timeout;
// 	return function() {
// 		var context = this, args = arguments;
// 		var later = function() {
// 			timeout = null;
// 			if (!immediate) func.apply(context, args);
// 		};
// 		var callNow = immediate && !timeout;
// 		clearTimeout(timeout);
// 		timeout = setTimeout(later, wait);
// 		if (callNow) func.apply(context, args);
// 	};
// };

export function debounce(wait, immediate) {
   return function decorator (func) {
      var timeout;
      return function() {
        var context = this,
          args = arguments;
        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(function() {
                timeout = null;
          if ( !immediate ) {
            func.apply(context, args);
          }
        }, wait || 200);

        if ( callNow ) {
          func.apply(context, args);
        }

      };
   }
}
