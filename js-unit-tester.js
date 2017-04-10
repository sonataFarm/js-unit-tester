/* js-unit-tester.js
   by Nate Festinger
   v.0 4/10/17
   
   framework for unit testing functions in JS

/* Data Definitions
   ---------------- */

/* Test is new Test(fn, name)
   interp. constructor for a unit test with: 
     - fn is function, a the function to test
     - name is string, the name of the function 
     - runs is natural, number of tests run
     - fails is natural, number of failed tests */

function Test(fn, name) { 
    
  this.fn = fn;
  this.name = name;
  this.runs = 0;
  this.fails = 0;
  
}


/* TestSuite is new TestSuite()
   interp. constructor for a test suite with: 
     - tests object contains unit tests */

function TestSuite() {
  this.tests = {};
}


/*  Methods
   --------- */

/* Test.prototype.assertEquals : array, value -> boolean
   return true if array of arguments applied to function equals the expected value, 
   else log error to console and return false */

Test.prototype.assertEquals = function(args, expected) {
  
  this.runs++;
  
  var actual = this.fn.apply(null, args);
  if (actual === expected) {
    return true;
  } else {
    this.fails++;
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


/* TestSuite.prototype.newTest : function, string -> undefined
   instantiate a new test type in test object */

TestSuite.prototype.newTest = function(fn, name) {
  if (this.tests[name]) {
    console.log("error: test for '" + name + "' already exists')");
  } else {
    this.tests[name] = new Test(fn, name);
  }
}

  
/* TestSuite.prototype.logResult : ->
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
  
TestSuite.prototype.logResult = function() {
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
  that = this.tests;
  for (var test in that) {
    total += that[test][key];
  }
  
  return total;
}