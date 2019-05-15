Search for case parsers:
1: Search endpoints
    - There are four forms to search four different options: id, name, keyword, date
    - ID:
        - action: http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.find_case
        - method: post
        - input: p_session (hiddent), p_community (hidden)
        - p_case_select (user input) 
    - Name:
        - action: http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.find_cases_by_name
        - method: post
        - input: p_session (hiddent), p_community (hidden)
        -  p_lname (user input), p_fname (user input) 
    - keyword:
        - action: http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.find_cases_by_keyword
        - method: post
        - input: p_session (hiddent), p_community (hidden)
        -  p_keyword (user input) , 2/3/4  (Select values) 
    -date:
        - action: http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.find_cases_by_date
        - method: post
        - input: p_session (hiddent), p_community (hidden), 
        -  p_from_date (user input) , p_to_date (user input) , ALL_DAY, MONDAY, TUESDAY, etc.. (selection options) 

//Local testing:
Search_result.js
    - This is the list of cases that are sent after search. its the same for all search options (id, name, keyword, date)

    
2: Search_result_final_link.js
    - this is the page when you click on a link from Search_result.js. This page only has the downlad link