
 var CONSTS = {
	
	// adjust the base dir , if needed 
	LOADBASE : "../commands/",
 
 };


 function forName(jsModuleName){
	// tmpliy do this , adjust it later 
	
	return require(CONSTS.LOADBASE+jsModuleName+".js");	
 }
 
 
 
module.exports = {

	forName : forName

}