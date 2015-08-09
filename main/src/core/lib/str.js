
 // implement some common and frequently use 
 // data structures here 
 var hashMap = {
	
	set : function(key,value){this[key] = value},
	
	get : function(key){return this[key]},
	
	contains : function(key){return this.get(key) === null?false:true;},
	
	remove : function(key){delete this[key];},
	
 
 };
 
 
 module.exports = {
 
	hashMap : hashMap,
 
 }