'use strict';

/*

	working with MongoDb

	make sure mongodb is running, 
		start server, run: "C:\Program Files\MongoDB\Server\3.0\bin\mongod.exe"
		open console, run: "C:\Program Files\MongoDB\Server\3.0\bin\mongo.exe"

	import filings.csv into Mongo
		cd ../example 3/export from SAS
		"C:\Program Files\MongoDB\Server\3.0\bin\mongoimport.exe" -d edgarfilings -c filings --type csv --file filings.csv --headerline

	
	run: node index.js
	end with: ctrl+c (the program will not end by itself as it has an open database connection)

	dependencies:
		npm install mongoose

*/
// system module
var request = require('request');
var fs = require('fs');
var mongoose = require('mongoose');
// connect to mongo
var db = mongoose.connect('mongodb://localhost/edgarfilings');

// require Mongoose model (that defines filings table)
require('./model'); // defines the filings table
// assign the table model to a variable (so we can query this table)
var FilingEntry = mongoose.model('filings');

// variables used
var downloads = "./downloads/";
var edgarPath = "http://www.sec.gov/Archives/";

/*
	let's expand the data in Mongo: let's keep track which filings are downloaded 
	- add functionality to download it (we have that)
	- update Mongo with the filename (so we download once)
*/

FilingEntry
.find({formtype: "10-K"})
.limit(10)
.exec(function(err, result) {
	// result holds matches (array)
  	console.log('#records', result.length);
  	// loop through result  	
  	processFilings(result);
});

// function that processes the filings, and makes sure each filing is downloaded
var processFilings = function(filings){
	filings.forEach(function(f) {
		// note: f is a record in Mongo, and has methods like f.save() to save changes on it!
		// you can also define methods in the model (model.js), which would be accessible here as well
		if (f.downloaded) {			
			processFiling(f);
		} else {
			console.log(f.coname + " needs to be downloaded");	
			// download filing			
			request( edgarPath + f.filename , function (error, response, body) {
				// if done with no errors
				if (!error && response.statusCode == 200) {
					console.log("Read " + f.formtype + " for " + f.coname);
					// write to disk	
					var local = downloads + f.fileId + ".txt";
					fs.writeFileSync(local, body, 'utf8');

					// update Mongo
					f.localfilename = local;
					f.downloaded = true;
					f.save();
					// now that it is downloaded, continue with processing
					processFiling(f);

				} else if (error){
					// error getting filing, requires follow-up
					console.log("Error retrieving " + f.formtype + " for " + f.coname +" (fileId: " + f.fileId + ")");
				}
			});
		}	
	});
};
// function that processes a downloaded filing
var processFiling = function(f){
	console.log('important processing for filing ' + f.coname);
	// ... etc
};

/* check Mongo, in mongo shell: 
		show dbs
		use edgarfilings 
		show collections
		use filings
		db.filings.find({downloaded:true}).limit(10)
*/