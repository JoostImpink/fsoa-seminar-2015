'use strict'; 

/* 	'use strict' tells node that all variables need to be declared 

		good: var name = "Joost";
		not good: name = "Joost";
*/

/*
	Making node module

	module.exports is an object with properties, fuctions

	everything 'inside' the module.exports becomes available when the module is used (see index.js)

*/

module.exports = {

	// properties
	firstName: "Joost",
	lastName: "Impink",
	age: 28,

	// functions
	prettyName: function() { return this.firstName + " " + this.lastName; },
	ageInYear: function(year){ return this.age + year - 2015; }


};