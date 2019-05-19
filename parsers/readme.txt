Search for case parsers:
1: Search endpoints
    - There are four forms to search four different options: id, name, keyword, date
    - ID:
        - action: http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.find_case
        - method: post
        - input: p_session (hiddent), p_community_id (hidden)
        - p_case_select (user input) 
		
{
	"p_case_select": "14119",
	"p_community" : "183",
	"p_session" : "139252"
}
curl -d "p_community=183&p_session=139251&p_case_select=19490" -X POST http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.find_case
		
    - Name:
        - action: http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.find_cases_by_name
        - method: post
        - input: p_session (hiddent), p_community_id (hidden)
        -  p_lname (user input), p_fname (user input) 
{
	"p_lname": "sy",
	"p_fname": "",
	"p_community_id" : "183",
	"p_session" : "138804"
}

    - keyword:
        - action: http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.find_cases_by_keyword
        - method: post
        - input: p_session (hiddent), p_community (hidden)
        -  p_keyword (user input) , p_s_choice : 2/3/4  (Select values) (subject heading, keyword field, document description)
   {
    "p_keyword": "%java%",
    "p_s_choice": "2",
    "p_community_id": "183",
    "p_session": "139247"
}
   
   
    -date:
        - action: http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.find_cases_by_date
        - method: post
        - input: p_session (hiddent), p_community (hidden), 
        -  p_from_date (user input) , p_to_date (user input) , ALL_DAY, MONDAY, TUESDAY, etc.. (selection options) 
		- Use the format MM/DD/YYYY for date entry; e.g., 03/15/2000 for March 15 of year 2000
curl -d "p_increment_date=ALL_DAY&p_session=139411&p_community_id=183&p_from_date=01/31/2019&p_to_date=05/01/2019" -X POST http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.find_cases_by_date
 {
    "p_increment_date": "ALL_DAY",
    "p_from_date": "01/31/2019",
    "p_to_date": "05/01/2019",
    "p_session": "139411",
	"p_community_id" : "183"
}

2: case_report
	- action: "http://bonnet19.cs.qc.edu:7778/pls/forum/ec_forum.retrieve_interface"
	- method: post
	- input: p_case_select (case number), p_session 
	


//Local testing:
Search_result.js
    - This is the list of cases that are sent after search. its the same for all search options (id, name, keyword, date)

    
2: Search_result_final_link.js
    - this is the page when you click on a link from Search_result.js. This page only has the downlad link

download link:
	-input: p_attach_ole, p_ses (session id) 
{
	"p_media_select": "ole",
    "p_attach_ole": "13926",
    "p_ses" : "138816",
    "p_case_id": "18131"
}
139252