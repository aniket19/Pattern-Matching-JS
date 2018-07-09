(function () {
  const {WILDCARD, TRUTHY, FALSY} = require ("./commons/symbols.js").symbols;
  const {predicates, matchMakers} = require ("./commons/helpers.js");
  const {
    isObject,
    isArray,
    isWildcard,
    isTruthy,
    isFalsy
  } = predicates;
  const {
    matchObject,
    matchArray,
    matchTruthy,
    matchFalsy
  } = matchMakers;

  var match = function (subject, ...matches) {
    for (let i = 0; i < matches.length; i++) {
      const {match, action} = matches [i];

      // 1. Array:
      // This code block assumes that each match is instance of Array.
      // This shallowly verifies the match with subject.
      // Code assumes that total number of keys in subject are same
      // as total number of keys in match.
      // 2. Object:
      // This code block assumes that each match is of type object.
      // This shallowly verifies the match with subject
      // Code assumes that total number of keys in subject are same
      // as total number of keys in match.
      if (
        (isWildcard (match)) ||
        (isTruthy (match) && matchTruthy (subject)) ||
        (isFalsy (match) && matchFalsy (subject)) ||
        (isArray (subject) && matchArray (subject, match)) ||
        (isObject (subject) && matchObject (subject, match)) ||
        (subject === match)
      ) {
        action (subject);
        return;
      }
    }

    throw "Match exausted";
  };

  match.any = WILDCARD;
  match.truthy = TRUTHY;
  match.falsy = FALSY;

  exports.match = match;
} ());
