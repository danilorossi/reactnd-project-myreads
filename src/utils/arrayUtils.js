/**
* @description Reduce an array of object to a dictionary of keys, where the keys are all the
*               possible values of the specified <field> in the <target> array objects, and the value
*               for each key is an array of object from the original array that have the
*               <field> value matching that key.
*               E.g.:
*                 const myArray = [{id: 1, category:"A"}, {id: 2, category:"A"}, {id: 3, category:"B"}];
*                 const dictionary = reduceToDictionary(myArray, 'category');
*               dictionary: {
*                 'A': [{id: 1, category:"A"}, {id: 2, category:"A"}],
*                 'B': [{id: 3, category:"B"}]
*               }
* @param {Array} target - An array of objects.
* @param {string} field - The field of the array objects to be used as key of the dictionary.
* @returns {Object} A key-value dictionary.
*/
export function reduceToDictionaryByField(target, field) {

  // Using reduce function to create the ductionary
  return target.reduce(function(prev, curr) {

    // If it's the first time we found this specific value for the <field>
    if(!prev[ curr[field] ]) {

      // We create the entry <fieldValue>:[object with this field value]
      prev[ curr[field] ] = [ curr ];
    } else {

      // Otherwise we just append the object to the array of objects
      // with the same value for <field>
      prev[ curr[field] ].push( curr );
    }

    // We pass the data structure down the array
    return prev

  }, {}); // Empty obj as first reduced value
}
