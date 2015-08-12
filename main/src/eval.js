
var util = require("./core/lib/util.js");

// the eval application, make it 
// natural for user to run commands 
// like 'ls' and 'cd xx ' 


function eval(command){
	
	// command.startsWith("grep") this does not work, strange, work on this later 
	if(command.substring(0,4) === ("grep")){
		// console.log(" ready to exec in grep  ");
		util.forName("grep").exec(command);
	}else{
		// feel free to add other commands 
		
	}
	

}

// makes a input-parse-looper  parser 



module.exports = {

	eval : eval

}