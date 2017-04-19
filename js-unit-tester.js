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

- Better test messages (a la Hack Reactor)
- either: 
        - passed [testName]; or
        - FAILED [testName]: Expected "expected", got "actual"
*/

function bracket(str) {
  // return string enclosed in brackets
  return '[' + str + ']';
}

Function.prototype.renderFailMsg = function(expected, actual, testName) {
  var msg = 'FAILED ' + bracket(testName) + ': Expected ' + expected + ', got ' + actual;
  return msg;
};

Function.prototype.renderPassMsg = function(expected, actual, testName) {
  var msg = 'passed ' + bracket(testName);
  return msg; 
}
   
Function.prototype.assertEquals = function() {  
  
  /* run test and log result

   expects the following arguments, in order:
      - each argument to pass to test function
      - expected result
      - test name (string)                     */
  
  var testName = arguments[arguments.length - 1];
  var expected = arguments[arguments.length - 2];
  var args = Array.prototype.slice.call(arguments, 0, arguments.length - 2);
  var actual = this.apply(null, args);
  
  if (actual === expected) {
    var msg = this.renderPassMsg(expected, actual, testName);
    console.log(msg);
    return true;
  } else {
    var msg = this.renderFailMsg(expected, actual, testName);
    console.log(msg);
    return false; 
  }
  
}