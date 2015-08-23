'use strict';

/*
	Mongoose Model

*/
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var FilingSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	coname: {
		type: String,
		default: ""
	},
	cik: {
		type: String,
		default: ""
	},
	formtype : {
		type: String,
		default: ""
	},
	filename : { // this is the url (not local filename)
		type: String,
		default: ""
	},
	fileId: {
		type: Number 
	},
	header: {
		type: {} // can be anything
	},
	downloaded: {
		type: Boolean,
		default: false
	},
	localfilename: {
		type: String,
		default: ""
	}
});

// make this available 
module.exports = mongoose.model('filings', FilingSchema);
