'use strict';
/*
	run as: node index.js
	dependencies: 
		npm install fast-csv
		npm install fs
		npm install request */

// our module
var filings = require('./filings');

// system module
var request = require('request');
var fs = require('fs');

// some config variables (could go into config module)
var downloads = "./downloads/";
var edgarPath = "http://www.sec.gov/Archives/";

// success callback for loading csv with filing info
var loaded = function(filings){	
    console.log('Read ' + filings.length + " filings.");
    console.log('First filing', filings[0]);
    // download first 10 filings	
	download( filings.slice(0, 9) );
};

// download filings from SEC, and write to downloads folder
var download = function(filings){
	filings.forEach(function (f){
		// read filing from SEC Edgar
		request( edgarPath + f.filename , function (error, response, body) {
			// if done with no errors
			if (!error && response.statusCode == 200) {
				console.log("Read " + f.formtype + " for " + f.coname);
				// write to disk	
				fs.writeFileSync(downloads + f.fileId + ".txt", body, 'utf8');
			} else if (error){
				// error getting filing, requires follow-up
				console.log("Error retrieving " + f.formtype + " for " + f.coname +" (fileId: " + f.fileId + ")");
			}
		});
	});
};

// load all filings
//filings.load( loaded);
// load all 10-Ks
filings.load( loaded, function(f) { return f.formtype === "10-K";} );
