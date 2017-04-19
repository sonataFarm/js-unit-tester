/* js-unit-tester.js
   authored by sonataFarm
   v.0 4/10/17
   
   framework for unit testing functions in JS

!!! TODOS
- Test.prototype.assertEquals
    - add comparisons for:
        - object
        - array
        - functions?

- Better test messages (a la Hack Reactor)

- Refactor assertEqual use 'call' vs. 'apply'
   (tired of typing arguments into array...this can get confusing)
   
- add test method to function prototype 
   
*/
   

/* Data Definitions
   ---------------- */

/* Test is new Test(fn, name)
   interp. constructor for a unit test with: 
     - fn is function, a the function to test
     - name is string, the name of the function 
     - runs is natural, number of tests run
     - fails is natural, number of failed tests */

function Test(fn) { 
    
  this.fn = fn;
  this.name = fn.name;
  this.runs = 0;
  this.fails = 0;
  
}

/* TestSuite is new TestSuite()
   interp. constructor for a test suite */

function TestSuite() {
}


/*  Methods
   --------- */

/* Test.prototype.assertEquals : 
   
   log results of test applying supplied arguments to parent test
   
   expects the following arguments, in order:
      - each argument to pass to test function, separated by commas
      - expected result
   
   log results of test on containing function */

Test.prototype.assertEquals = function() {  
  
  this.runs++; // track runs for reporting
  
  var expected = arguments[arguments.length - 1];
  var args = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
  console.log('args: ' + args);
  var actual = this.fn.apply(null, args);
  if (actual === expected) {
    return true;
  } else {
    this.fails++; // track fails for reporting
    console.log(this.errMsg(args, expected, actual));
    
    return false; 
  }
  
}

/* Test.prototype.errMsg : array, value, value -> string
   return error message given an array of arguments,
   an expected value and an actual value

   ex: addTest.errMsg([1, 2], 3, 4) logs:
   "add(1, 2) failed 
    Expected result: 3
    Actual result: 4
    -------------" */

Test.prototype.errMsg = function(args, expected, actual) {
  var msg = this.name + '(';
  args.forEach(function(element){ msg += String(element) + ", "; } );
  msg = msg.slice(0, msg.length - 2);
  msg += ') failed\n';

  msg += 'Expected result: ' + String(expected) + '\n';
  msg += 'Actual result: ' + String(actual) + '\n';
  msg += '-------------';
  
  return msg;
}


/* TestSuite.prototype.addTest : function, string -> undefined
   instantiate a new test type in test object */

TestSuite.prototype.addTest = function(fn) {
  if (this[fn.name]) {
    console.log("error: test for '" + fn.name + "' already exists')");
  } else {
    this[fn.name] = new Test(fn);
  }
}
  
/* TestSuite.prototype.logResults : ->
   log a summary of test results
   
   examples: 
       "Result: 4 tests passed, 3 failed"
   or       
       "All 7 tests passed!"
   or 
       "All 7 tests failed :(" 
   or      
       "Didn't run any tests!"
   */
  
TestSuite.prototype.logResults = function() {
  var runs = this.totalRuns();
  var fails = this.totalFails();
  if (!runs) {
    console.log("Didn't run any tests!");    
  } else if (!fails) {
    console.log("All " + runs + " tests passed!");
  } else if (fails === runs) {
    console.log("All " + runs + " tests failed :(");
  } else {
    console.log("Result: " + String(runs - fails) + " tests passed, " +
                String(fails) + " tests failed");
  }
}


/* TestSuite.prototype.totalRuns : -> Natural 
   return total number of tests run at call time */

TestSuite.prototype.totalRuns = function() {
  return this.total('runs');
}


/* TestSuite.prototype.totalFails : -> Natural 
   return total number of tests failed at call time */

TestSuite.prototype.totalFails = function() {
  return this.total('fails');
}  

  
/* TestSuite.prototype.total : String -> Natural 
   for all tests, total the number contained at key */
  
TestSuite.prototype.total = function(key) {
  
  var total = 0;
  
  for (var test in this) {
    if (this[test].hasOwnProperty(key)) {
      console.log(this[test][key]);
      total += this[test][key];
    }
  }
  
  return total;
}

// Testing for AssertEquals
var sum = function(a, b, c) {
  return a + b + c;
}

var ts = new TestSuite();

ts.addTest(sum);
ts.sum.assertEquals(1, 2, 3);
