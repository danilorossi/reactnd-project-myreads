export function reduceToDictionaryByField(target, field) {
  return target.reduce(function(prev, curr) {
    if(!prev[ curr[field] ]) {
      prev[ curr[field] ] = [ curr ];
    } else {
      prev[ curr[field] ].push( curr );
    }
    return prev
  }, {});
}
