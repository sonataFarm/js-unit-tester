/* js-unit-tester.js
   authored by sonataFarm
   v.0 4/10/17
   
   a simple JS unit testing framework
   
   - adds assertEquals() and assertMethodEquals() methods onto Function prototype
   
   - comparison support for: 
       - primitives (Number, String, Boolean, null, undefined)
       - objects
       - arrays 
       (any other types encountered will result in unpredictable behavior)
   
   WARNING: Will mutate native Function prototype! */


Function.prototype.assertEquals = function() {  
  
/* run test and log result
   for function testing only; test methods with assertMethodEquals()

  expects the following arguments, in order:
    - parameters to pass to test function
    - expected result
    - test name (string) */

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

Function.prototype.assertMethodEquals = function() {  
  
/* run test and log result
   for method testing only; test functions with assertEquals()

  expects the following arguments, in order:
    - parent object for method to act on
    - parameters to pass to test function
    - expected result
    - test name (string) */

  var testName = arguments[arguments.length - 1];
  var expected = arguments[arguments.length - 2];
  var parent = arguments[0];
  var args = Array.prototype.slice.call(arguments, 1, arguments.length - 2);
  
  var actual = this.apply(parent, args);
   
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


function areEqual(a, b) {
  /* return true if a and b are 'equal', i.e. strictly equal (===) and contain identical values.
     performs deep comparison on objects and arrays 
     
     ASSUMES: a, b are primitives (Number, String, Boolean, null, undefined), objects or arrays */
  
  if (!areSameType(a, b)) {
    return false; 
  }
  
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


function areSameType(a, b) {
  if (a === undefined || a === null) {
    return a === b;
  } else {
    return a.constructor === b.constructor;
  } 
}


function countProperties(obj) {
  var count = 0;
  
  for (var property in obj) {
    ++count;
  }
  
  return count;
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