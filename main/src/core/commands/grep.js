// first implement this 

// use this cmd_template 
var cmd_template = require("./cmd_template.js");
var str = require("../lib/str.js");

var CONSTS =  cmd_template.pop("consts");
var SHARED =  cmd_template.pop("shares");

// system includes 
var fs = require("fs");  // use customed fs lib later 
var path = require("path");



var _flags = "A#B#HLbchilm#nosvwxR#";  // temporarily only implement the -R flag 
/*
unsigned long long Aflag;	 -A x: print x lines trailing each match 
unsigned long long Bflag;	 -B x: print x lines leading each match 
bool	 Hflag;		 -H: always print file name 
bool	 Lflag;		 -L: only show names of files with no matches 
bool	 bflag;		 -b: show block numbers for each match 
bool	 cflag;		 -c: only show a count of matching lines 
bool	 hflag;		 -h: don't print filename headers 
bool	 iflag;		 -i: ignore case 
bool	 lflag;		 -l: only show names of files with matches 
bool	 mflag;		 -m x: stop reading the files after x matches 
unsigned long long mcount;	/* count for -m 
bool	 nflag;		 -n: show line numbers in front of matching lines 
bool	 oflag;		 -o: print only matching part 
bool	 qflag;		q: quiet mode (don't output anything) 
bool	 sflag;		 -s: silent mode (ignore errors) 
bool	 vflag;		 -v: only show non-matching lines 
bool	 wflag;		 -w: pattern must start and end on word boundaries 
bool	 xflag;		 -x: pattern must match entire line 
*/



// module initialization 
{
	// think out a better way to initial these values later 
	for(var i=0;i<_flags.length;i++){
		if(_flags[i+1] === '#'){   // # stands for a number if needed by this flag 
			CONSTS.flags.push('-'+_flags[i]+_flags[++i]);
		}
		else{
			CONSTS.flags.push("-"+_flags[i]);
		}
	}
	
	var hashMap = str.hashMap;
	
	CONSTS.searchingCache = [];
	CONSTS.searchingResult = [];
}



// first here do a simple and stupid version of grep here 
CONSTS.permission.push("READ_FILE");  // 动词+名词的权限组合


function inner_test(){
	
	// console.log(CONSTS.flags);
	
	SHARED.exec("grep -R Caller ./");
	// SHARED.exec("grep -C 4 -R helloworld ./");
	
	

}


function listdirs(_dir,handleforeachfile){
	
	// console.log(" dir is : "+_dir);
	// at last, returns a list containing file names 
	
	fs.readdir(_dir,function(err,files){
		
		//console.log(files.length);	
		if(!files.length){
			// no files return 
			return ;
		}
		
		files.forEach(function(file){
			
			file = path.resolve(_dir,file);
			
			fs.stat(file,function(err,stat){
			
				if(err){
					console.log(err);
					return ; 
				}
				if(stat.isDirectory()){
					listdirs(file,handleforeachfile);
				}
				else{
					if(exist(hashMap.get("-R"))){
						handleforeachfile(file,hashMap.get("-R"));
					}
				}
			});	
		});
	});
	
}




function loadfilesandsearch(filename,keyword){
	
	// add some regex match later 
	// special deal in . addr temporarily 
	
	// console.log(fs);
	
	fs.readFile(filename,{"encoding" : "utf-8",},function(err,data){
		if(err) throw err;
		var lines = data.split("\n");
	
	/*
		lines.forEach(function(line){
					console.log(line);
			if(line.contains(keyword)){
				// find one match 
				console.log(line);
			}
		}());
	*/
		// the above way does not work, strange , enough 
		var line = '';
		for(var i=0;i<lines.length;i++){
			line = lines[i];
			if(line.contains(keyword)){
				// find one match 
				console.log(filename+" ------   "+i+"  : "+line);
			}
		}
		
		
	});
	
	
}

function exist(keyword){
	
	return (keyword === null)?false : true;
	
}

// prototype reimplement  start 
SHARED.params2cases = function(params){
	
	// console.log(params);  
	// params are like such : [ 'grep', '-R', 'helloworld', './' ]
	// the first param will be ignored , cuased it must have been handled 
	// so start from the second one 
	
	// parse out the param related with flag and then store 
	// them into context 
	// this format does not work :  for(flag in flags){...} , figure out why later 
	// make this common later and not to be rewritten again later 
	for(var i=0;i<CONSTS.flags.length;i++){
		if(params.contains(CONSTS.flags[i].substring(0,2))){
			//console.log(CONSTS.flags[i].substring(0,2));
			// suggest use map or dict here to push and pop params 
			if(CONSTS.flags[i].length === 3 && CONSTS.flags[i][2] === '#'){ // need param 
				// make a judgement if the next input is param 
				// instead of a useful flag 
				// need to check array range here 
				if(CONSTS.flags.contains(params[params.indexOf(CONSTS.flags[i].substring(0,2))+1])){
					// not illeage argument, quit 
					return ;
				}else{
					hashMap.set(CONSTS.flags[i].substring(0,2),params[params.indexOf(CONSTS.flags[i].substring(0,2))+1]);
					// console.log(params[params.indexOf(CONSTS.flags[i].substring(0,2))+1]);
				}
			}
			else{
				// this flag is pointed , but no param needed 
				hashMap.set(CONSTS.flags[i],"");
			}
		}
	}

}

SHARED.exec = function(param){
	
	var params = SHARED.cmd2params(param);
	SHARED.params2cases(params);
	// use the exec then 
	
	// lazy put searching dir 
	hashMap.set("searchingdir",params[params.length-1]);
	
	// switch (CONSTS.context)  use if-else instead of switch clause
	if(hashMap.contains("-R")){   // recursively searching mode 
		// -R is the primary flag
		// first do current dir searching only , which means the searchingdir will be set to be './' only 
		// first load files ,and then do search 
		// loadfilesandsearch("./");
		listdirs("./",loadfilesandsearch);
	}
}

// prototype reimplement  end 

function call(func,param){
	// first judge own function , then if not 
	// implemented, use ones in father 
	

}


module.exports = {

	inner_test : inner_test

}