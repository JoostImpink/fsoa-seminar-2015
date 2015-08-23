/*
	Create .csv file with SEC Edgar filings


	Assuming the SAS dataset here: http://www.wrds.us/index.php/repository/view/25
	is available locally as edgar.filings
*/

/* get a portion of the data */
data edgar2006;
set edgar.filings;
if '01mar2006'd <= date < '05mar2006'd;
fileId = _N_;
run;

/* export as csv */
proc export data= edgar2006 outfile="C:\cygwin64\home\joost\projects\node-seminar\example 3\export from SAS\filings.csv" dbms=csv replace; run;

/* first observations 

coname|formtype|cik|filename|date|fileId
1 800 FLOWERS COM INC|SC 13G/A|1084869|edgar/data/1084869/0000065103-06-000099.txt|03MAR2006|5324897
1 800 FLOWERS COM INC|SC 13G/A|1084869|edgar/data/1084869/0000065103-06-000101.txt|03MAR2006|5324898
1016 1ST AVE SOUTH L P|REGDEX|1356457|edgar/data/1356457/9999999997-06-009387.txt|03MAR2006|5324904
14159 capital (GP), LLC|4|1317493|edgar/data/1317493/0001144204-06-008352.txt|01MAR2006|5324924
1717 CAPITAL MANAGEMENT COMPANY|X-17A-5|80869|edgar/data/80869/9999999997-06-024267.txt|03MAR2006|5324929
*/
