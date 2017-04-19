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

*/

Function.prototype.renderErrMsg = function(args, expected, actual) {
  var msg = this.name + '(';
  args.forEach(function(element){ msg += String(element) + ", "; } );
  msg = msg.slice(0, msg.length - 2);
  msg += ') failed\n';

  msg += 'Expected result: ' + String(expected) + '\n';
  msg += 'Actual result: ' + String(actual) + '\n';
  msg += '-------------';

  return msg;  
  
};

Function.prototype.assertEquals = function() {  
    
  var expected = arguments[arguments.length - 1];
  var args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
  var actual = this.apply(null, args);
  
  if (actual === expected) {
    return true;
  } else {
    console.log(this.renderErrMsg(args, expected, actual));
    return false; 
  }
  
}