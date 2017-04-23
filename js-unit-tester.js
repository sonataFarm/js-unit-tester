/* js-unit-tester.js 1.0.1
   by Nate Festinger
   
   a simple JS unit testing framework: 
   
   - adds assertEquals() and assertMethodEquals() methods onto Function prototype
   
   - comparison support for: 
       - primitives (Number, String, Boolean, null, undefined)
       - objects 
       - arrays 
       (other types may result in unpredictable behavior)
   
   WARNING: Will mutate native Function prototype! */


Function.prototype.assertEquals = function() {  
  
/* run test and log result
   for function tests only; test methods with assertMethodEquals()

  expects the following arguments, in order:
    - parameters to pass to test function
    - expected result
    - test name (string) */

  var args = Array.prototype.slice.call(arguments, 0, arguments.length - 2);
  var expected = arguments[arguments.length - 2];
  var testName = arguments[arguments.length - 1];
  
  var actual = this.apply(null, args);

  if (areEqual(expected, actual)) {
    var msg = this.renderPassMsg(expected, actual, testName);
    console.log(msg);
    return true;
  } else {
    var msg = this.renderFailMsg(expected, actual, testName);
    console.log(msg);
    return false; 
  } 
}

Function.prototype.assertMethodEquals = function() {  
  
/* run test and log result
   for method tests only; test functions with assertEquals()

  expects the following arguments, in order:
    - parent object to bind method to
    - parameters to pass to test function
    - expected result
    - test name (string) */

  var parent = arguments[0];
  var args = Array.prototype.slice.call(arguments, 1, arguments.length - 2);
  var testName = arguments[arguments.length - 1];
  var expected = arguments[arguments.length - 2];
  
  var actual = this.apply(parent, args);
   
  if (areEqual(expected, actual)) {
    var msg = this.renderPassMsg(expected, actual, testName);
    console.log(msg);
    return true;
    
  } else {
    var msg = this.renderFailMsg(expected, actual, testName);
    console.log(msg);
    return false; 
  } 
}


function areEqual(a, b) {
  /* return true if a and b are 'equal', i.e. contain identical values
     performs deep comparison on objects and arrays 
     
     Assumes a, b are primitive (Number, String, Boolean, null, undefined), object or array */
  
  if (!areSameType(a, b)) {
    return false; 
  }
  
  if (isPrimitive(a)) {  
    return a === b;
  
  } else if (a instanceof Array) {
    return areSameLength(a, b) && containSameItems(a, b);

  } else { 
    // else a, b are objects    
    return containSameNumberOfProps(a, b) && propsContainSameValues(a, b);
  } 
}


function areSameLength(a, b) {
  // a, b: arrays
  return a.length === b.length;
}


function containSameItems (a, b) {
  // a, b: arrays
  return a.every(function(item, index) {
    return areEqual(item, b[index]);
  });
}


function areSameType(a, b) {
  if (a == undefined || b == undefined) {
    return a === b;
    
  } else {
    return a.constructor === b.constructor;
  } 
}


function containSameNumberOfProps(a, b) {
  return countProperties(a) === countProperties(b);
}


function countProperties(obj) {
  var count = 0;
  
  for (var property in obj) {
    ++count;
  }
  
  return count;
}


function propsContainSameValues(a, b) {
  // a, b: objects 
  for (var prop in a) {
    if (!areEqual(a[prop], b[prop])) {
      return false;
    }
  }
  return true; 
}


function isPrimitive(obj) {
  /* return true if object is a primitive (Number, String, Boolean, undefined or null) */
  
  var PRIMITIVE_TYPES = ['number', 'string', 'boolean', 'undefined'];
  
  return obj === null || PRIMITIVE_TYPES.includes(typeof obj); 
}


Function.prototype.renderPassMsg = function(expected, actual, testName) {
  var msg = 'passed ' + bracket(testName);
  return msg; 
}


Function.prototype.renderFailMsg = function(expected, actual, testName) {
  var msg = 'FAILED ' + bracket(testName) + ': Expected ' + JSON.stringify(expected) + ', got ' + JSON.stringify(actual);
  return msg;
};


function bracket(str) {
  // return string enclosed in brackets
  return '[' + str + ']';
}