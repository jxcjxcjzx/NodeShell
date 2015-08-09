
 // reserved 
 var CONSTS = {
 
	environment : [],
	
	context : [],
	
	flags : [], // you should be familiar with this  :)
	
	permission : [],
	
	pop_choice_1 : "consts",
	
	pop_choice_2 : "shares",
 
 };
 
 // use customed array instead later 
Array.prototype.contains = function(item){
	return this.indexOf(item) >-1;
};

String.prototype.contains = function(item){
	return this.indexOf(item) >-1;
};
 

 function popConsts(){
	
	return CONSTS;
 
 }
 
 var SHARED = {
 
 // a chain of xx2xx, i think this kind of 
 // construction is better then making 
 // everything so clear 
 
	cmd2params : function(param){
	 //  console.log(" parse the params   ");
		return param.split(" ");
	},
	
	params2cases : function(params){
		// use switch--case here 
		// make judgement of param length and then 
		// do the things needed, just learn from 
		// linux command source code 
		
	},
 
	exec : function(paramifneed){
	// paramifneed can be null or empty 
		console.log(" exec the function  ");
	},
	
	// this is light weighted implement 
	inherit : function(func,reimplement){
		if(func === null){
			// do nothing 
		}
		else{
			// do the reimplement 
			// for debug only 
			// console.log(" do the inherit operation  ");
			// this does not work temporarily , figure out it later 
			
		}
	},
	
	// this abstract tag means this fucntion will
	// have to be implemented forcely 
	inner_test_ABSTRACT : function(){
		
	},
 
 };
 
 function popShares(){
	
	return SHARED;
 
 }
 
 function adaptForPopChoices(choice){
	// this is kindly added for 
	// some cases i might forget the precise 
	// choise words , say, if type 'cons' or 'constants', it will
	// be adapted to "consts" as well as the same 
	// remember, filter the difference between 
	// ¥Û–°–¥
 
	return choice;
 }
 
 function pop(choice){
	// there is temporarily only 
	// two choices -- popConsts and popShares
	// for other requests , just ignore it 
	choice = adaptForPopChoices(choice);
	
	switch (choice){
		
		case "consts" : return popConsts();
		break;
		
		case "shares" : return popShares();
		break;
		
		default : break;  // nothing will return 
	}
 
 }
 
 function call(onefunction){
	// the father function here, if 
	// child's self implementation , use it then 
	
 
 }
 
 
 module.exports = {
	
	call : call,
	
	pop : pop,  // pop("consts") or pop("shares")
 
 }