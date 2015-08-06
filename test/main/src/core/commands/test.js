var repl = require("repl");


// begin of all kinds of commands
var ls = require("./ls_test.js");

// the command design pattern 

var explain = ls;   // the default explainer 


var explain_transfer_commands  = {
	
	ls_handler : {
		tag : "use ls",
		handler : ls,
	},
		
		


};


repl.start({
// start with the command input and recall
	prompt: ">",
	eval:function(cmd,context,filename,callback){
		if(cmd!="(\n)"){
			cmd = cmd.slice(1,-2);  // rm params and ..
			var ret = explain.explain(cmd);  // if this functions works 
		    callback(null,ret);
		}else{
			callback(null);
		}
	}		
});

