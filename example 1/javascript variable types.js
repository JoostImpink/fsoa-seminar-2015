/*
	Nodejs uses Javascript (official name: ECMA script)

	use: http://jsconsole.com/
*/


// define variables with var
////////////////////////////

// string
var myName = "Joost";
console.log("My name is " + myName);

// number
var myAge = 28; // not really, but it sounds good
console.log("Last year I was", myAge - 1);

// this is an array
var myToys = ["SAS", "Stata", "nodejs"];
console.log('My first toy is: ' + myToys[0]); // Outputs: My first toy is: SAS

// object
var me = {
	name: "Joost",
	age: 28,
	hobbies: [
		"coding", "testing", "programming", "SAS", "debugging"
	]
};

// functions
////////////

var doIt = function(name) {
	console.log('Hi ' + name + "!"); // console.log outputs to the log
};
// function call
doIt("Gators");

// functions 
var ageBinner = function(age) {
	// ( expression )  ? => ternary operation: if true, return first item, if false, second item
	return (age < 28) ? "a young gun" : "an old fart";
};

console.log(me.name + " is " + ageBinner(me.age));

// functions can be arguments to function calls
var processPerson = function(ageFn, person) {
	var retVal = 'Let me tell you something about ' + person.name;
	var ageType = ageFn(person.age);
	return retVal + "\n" + "This person is " + ageType;
};
// call
var profile = processPerson(ageBinner, me);
console.log("Profile: " + profile);

// objects and functions
////////////////////////

// object property can be a function

// object, this refers to object itself, notice the argument for function ageBinner
var me = {
	name: "Joost",
	age: 28,
	hobbies: [
		"coding", "testing", "programming", "SAS", "debugging"
	],
	ageBinner: function(cutoff) {
		return (this.age < cutoff) ? this.name + " is a young gun" : this.name + " is an old fart";
	}
};
console.log("Agebinner says: " + me.ageBinner(75));
console.log("Agebinner says: " + me.ageBinner(28));

// array of objects
var myStruct = [{
	name: "Joost",
	age: 28,
	keywords: ["UF", "SAS", "hot tub"]
}, {
	name: "Walter White",
	age: 52,
	keywords: ["chemistry", "family man", "enterpreneur"]
}];

// function to test if array holds keyword, indexOf returns position (0, 1, 2, ...), or -1 if not in array
var personHasKeyword = function(person, keyword) {
	return (person.keywords.indexOf(keyword) > -1) ? true : false;
};

//loop through objects in array -- use of anonymous (unnamed) function
// each element in myStruct is passed as an argument (called item) in the anonymous function
myStruct.forEach(function(item) {
	console.log('item', item);
	var isFamilyMan = personHasKeyword(item, "family man") ? " is a family man" : " is no family man";
	console.log(item.name + isFamilyMan);
});