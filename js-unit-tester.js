/* js-unit-tester.js
   authored by sonataFarm
   v.0 4/10/17
   
   framework for unit testing functions in JS

!!! TODOS
    -----
    - add comparisons for:
        - object
        - array
        - functions?
    
    - add assertWithinRange function
    
    - areEqual : exclude invalid types 
*/

function bracket(str) {
  // return string enclosed in brackets
  return '[' + str + ']';
}

Function.prototype.renderFailMsg = function(expected, actual, testName) {
  var msg = 'FAILED ' + bracket(testName) + ': Expected ' + JSON.stringify(expected) + ', got ' + JSON.stringify(actual);
  return msg;
};

Function.prototype.renderPassMsg = function(expected, actual, testName) {
  var msg = 'passed ' + bracket(testName);
  return msg; 
}

function areSameType(a, b) {
  if (a == undefined || b == undefined) {
    return a === b;
  } else {
    return a.constructor === b.constructor;
  } 
}

function isPrimitive(obj) {
  return typeof obj === 'number' || typeof obj === 'string' || typeof obj === 'boolean' ||
    obj === undefined || obj === null; 
}

function countProperties(obj) {
  var count = 0;
  
  for (var property in obj) {
    ++count;
  }
  
  return count;
}

function areEqual(a, b) {
  // return true if a and b are 'equal' based on deep comparison
  // a, b: primitives, arrays or objects
  
  if (!areSameType(a, b)) {
    return false; 
  }

  // !!! TODO: check for invalid types
  
  if (isPrimitive(a)) {
    return a === b;
  } else if (a instanceof Array) {
    var areSameLength = a.length === b.length; 
    var containSameItems = a.every(function(item, index) {
      return areEqual(item, b[index]);
    });
    
    return areSameLength && containSameItems;
    
  } else { 
    // else a, b are objects
    var containSameNumberOfProps = countProperties(a) === countProperties(b);
    
    var propsContainSameValues = true;
    
    for (var prop in a) {
      if (!areEqual(a[prop], b[prop])) {
        propsContainSameValues = false;
      }  
    }
    
    return containSameNumberOfProps && propsContainSameValues;
  }
    
}

Function.prototype.assertEquals = function() {  
  
/* run test and log result
   for functions only; test methods with assertMethodEquals

 expects the following arguments, in order:
    - arguments to pass to test function
    - expected result
    - test name (string)                     */

  var testName = arguments[arguments.length - 1];
  var expected = arguments[arguments.length - 2];
  var args = Array.prototype.slice.call(arguments, 0, arguments.length - 2);
  var actual = this.apply(null, args);
   
  var passed = areEqual(expected, actual);

  if (passed) {
    var msg = this.renderPassMsg(expected, actual, testName);
    console.log(msg);
    return true;
  } else {
    var msg = this.renderFailMsg(expected, actual, testName);
    console.log(msg);
    return false; 
  } 
}