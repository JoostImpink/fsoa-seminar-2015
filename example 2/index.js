'use strict';

/* run this script with: node index.js */

/* import the module in person.js */
var person = require('./person');

/* the module.export of person.js is available in the person variable */
console.log('person object', person);

var year = 2050;
var name = person.prettyName();
var age = person.ageInYear( year );

console.log(name  + " will be " + age + " in the year " + year);
