'use strict';

// module for file system functions
var fs = require('fs');
var csv = require("fast-csv");

/*
	module to load filings.csv that was exported from SAS

	coname|formtype|cik|filename|date|fileId
	1 800 FLOWERS COM INC|SC 13G/A|1084869|edgar/data/1084869/0000065103-06-000099.txt|03MAR2006|5324897
	1 800 FLOWERS COM INC|SC 13G/A|1084869|edgar/data/1084869/0000065103-06-000101.txt|03MAR2006|5324898
	1016 1ST AVE SOUTH L P|REGDEX|1356457|edgar/data/1356457/9999999997-06-009387.txt|03MAR2006|5324904  	*/

module.exports = {
	
	// location of SAS export with filing info (this could go into a config module)
	file: "export from SAS/filings.csv",
	/*
		load: loads the filing.csv
		success: callback function when done 		
		filter: optional function to filter 
	*/
	load: function(success, filter) {
		// array to hold filings data
		var result = [];
		// use of fast-csv, see https://github.com/C2FO/fast-csv
		var stream = fs.createReadStream( this.file );
		// use fast-csv to load and parse csv file
		csv
		 .fromStream(stream, { delimiter: "|", headers : true }  )
		 // on ("data") is called after reading each line
		 .on("data", function(data){
		     // if no filter, or filter set and data passes filter, push into result
		     if (!filter || filter(data)) { result.push(data); }
		 })
		 // on ("end") is called when done; callback success with result
		 .on("end", function(){  success(result); });
	} 
} 