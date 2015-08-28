'use strict';

/*
	This module gets information out of the 10-K.

	Use regexr.com to write/test regular expressions

*/

module.exports = {

	text: null,  // raw filing text
	header: null, // header
	headerVars: {}, // some key variables in header
	isHTML: null, // boolen, true if filing is in HTML format	

	/*
		Example header of a 10-K

		<SEC-HEADER>0000034782-06-000020.hdr.sgml : 20060303
		<ACCEPTANCE-DATETIME>20060303103928
		ACCESSION NUMBER:		0000034782-06-000020
		CONFORMED SUBMISSION TYPE:	10-K
		PUBLIC DOCUMENT COUNT:		7
		CONFORMED PERIOD OF REPORT:	20051231
		FILED AS OF DATE:		20060303
		DATE AS OF CHANGE:		20060303

		FILER:

			COMPANY DATA:	
				COMPANY CONFORMED NAME:			1ST SOURCE CORP
				CENTRAL INDEX KEY:			0000034782
				STANDARD INDUSTRIAL CLASSIFICATION:	STATE COMMERCIAL BANKS [6022]
				IRS NUMBER:				351068133
				STATE OF INCORPORATION:			IN
				FISCAL YEAR END:			1231

			FILING VALUES:
				FORM TYPE:		10-K
				SEC ACT:		1934 Act
				SEC FILE NUMBER:	000-06233
				FILM NUMBER:		06662130

			BUSINESS ADDRESS:	
				STREET 1:		100 NORTH MICHIGAN STREET
				CITY:			SOUTH BEND
				STATE:			IN
				ZIP:			46601
				BUSINESS PHONE:		5742352702

			MAIL ADDRESS:	
				STREET 1:		P O BOX 1602
				STREET 2:		P O BOX 1602
				CITY:			SOUTH BEND
				STATE:			IN
				ZIP:			46634

			FORMER COMPANY:	
				FORMER CONFORMED NAME:	FBT BANCORP INC
				DATE OF NAME CHANGE:	19820818
		</SEC-HEADER>
	*/
	// initialize by passing 10-K filing text (as filed), return some header variables
	init: function(text) {
		var header;
		// text is required argument
		if (!text) { return;}
		//console.log('text length', text.length);
		this.text = text;
		// regex that will match the header
		var headerRegex = /(^<SEC-HEADER>[\s\S]*?<\/SEC-HEADER>)/im;
		header = text.match(headerRegex)[0];
		// filing should have header
		if (!header) {return;}
		this.header = header;
		// collect key variables from header
		this.headerVars = {
			name: this.headerRegxHelper( header, /COMPANY CONFORMED NAME:\s*(.*)\s*?$/im ),
			cik: this.headerRegxHelper( header, /CENTRAL INDEX KEY:\s*(.*)\s*?$/im ),
			eoy: this.headerRegxHelper( header, /CONFORMED PERIOD OF REPORT:\s*(.*)\s*?$/im ),
			sic: this.headerRegxHelper( header, /STANDARD INDUSTRIAL CLASSIFICATION:\s*(.*)\s*?$/im ),
			incorporated: this.headerRegxHelper( header, /STATE OF INCORPORATION:\s*(.*)\s*?$/im )
		};	
		// does filing contain HTML?
		this.isHTML = ( text.search(/\<HTML\>/i) > - 1 ) ? true : false;
		//console.log('isHTML', this.isHTML);
		return this.headerVars;
	},
	headerRegxHelper: function( text, regx ){
		var matches = text.match(regx);
		// matches[0] holds string with full match, matches[1] holds parentheses match 
		// e.g. 		text.match(/COMPANY CONFORMED NAME:\s*(.*)\s*?$/im);link
		// ["COMPANY CONFORMED NAME:     1ST SOURCE CORP ", "1ST SOURCE CORP "]
		if (matches) { return matches[1];}
	},
	// retrieve report of independent auditor, no need to pass arguments
	auditReport: function(){
		// typical heading:   Report of independent registered public accounting firm
		// but, we don't want matches in the table of contents, references, etc
		// so we'll also match on a piece of text that is typically in the auditor's report: 
		// 'in our opinion', or 'we have audited'
		// get up to 2500 characters (hard to tell the ending of any section)
		var retVal = []; // will hold return value, an array just in case there are multiple matches
		var reportRegx = /report\s*of\s*independent\s*registered\s*public\s*accounting\s*firm[\s\S]{1,2500}/igm;
		// get rid of HTML tags
		var filingNoHTML = (this.isHTML) ? this.text.replace(/(<([^>]+)>)/ig,"") : this.text;
		// match		
		var matches=filingNoHTML.match(reportRegx);
		// guard against having no matches
		if(!matches) { return [];}
		// loop through matches, we want 'in our opinion' or 'we have audited' in the text
		matches.forEach( function(m){
			if ( m.search('/in\s*our\s*opinion/m') || m.search('/we\s*have\s*audited/m') ) {
				// this match seems good; add it to return value array
				retVal.push(m);
			}
		});
		// return the good matches
		return retVal;
	}

};