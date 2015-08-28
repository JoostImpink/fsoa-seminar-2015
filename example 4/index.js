'use strict';
/*
	load filings in the downloads directory and process these

	run as: node index.js  
	or to write output to a file: node index.js > test.txt 
*/

// read module
var filing10K = require('./filing10K');

// system module
var request = require('request');
var fs = require('fs');

// name of directory
var myFilingsDir = "../example 3/downloads/";

// get file names in directory
var files = fs.readdirSync( myFilingsDir );

// this will hold all the results, everything
var myResult = [];

// loop through files
files.forEach(function(file){
	//console.log('Parsing file ' + file);
	// read file
	var fileRaw = fs.readFileSync( myFilingsDir +  file, "utf8");
	// init filing10K module, returns header variables
	var headerVars = filing10K.init ( fileRaw );
	// get audit report
	var report = filing10K.auditReport();
	//console.log(headerVars, report);
	myResult.push ({
		headerVars: headerVars,
		isHtml: filing10K.isHTML,
		auditReports: report
	});
});
// all done
console.log(myResult);
