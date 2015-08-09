// the test dir is located in test/main/res dir, 
// and the source code is reference from android 
// 4.4 incallui package 

 var grep = require("../../../../../main/src/core/commands/grep.js");

 function explain(){
	
	grep.inner_test();
	
 }
 
explain();
 
 
 module.exports = {
	
	explain : explain
 
 }