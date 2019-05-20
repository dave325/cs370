END POINT: /api/register
FILE: bonnet


SIGN UP:
minimum fields: 
{
    "p_usr_lname":  "one",
    "p_usr_fname":  "track",
    "p_usr_username":  "trackone",
    "p_usr_password":  "track",
    "p_usr_password2": "track",
    "p_usr_community": "Software Engineering PIN #:183",
    "p_community_pin": "183",
    "p_usr_email" : "nazmul789@gmail.com",
    "p_usr_role": "14" 
}


curl -d "p_increment_date=ALL_DAY&p_session=139622&p_community_id=183&p_from_date=01/31/2019&p_to_date=05/01/2019" -X POST http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_forum.find_cases_by_date




Register:

1 - http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_admin.html  
	-- not needed? 
2 - form 
REQUIRED: None of these fields can be empty: 
	- Last name; 
	- First name; 
	- Email; 
	- Username; 
	- Password; 
	- Community; 
	- Category of profession
Organization name must also be provided if you are a corporate/institute user

	- action : http://bonnet19.cs.qc.cuny.edu:7778/pls/forum/ec_admin.guest_registerDispatch
	- method : post

FORM: 
	-  NAME AND PERSONAL INFORMATION 
		- p_usr_lname
		- p_usr_fname
		- p_usr_title
		- p_usr_jobtitle
	-	User type (Select)
		- p_usr_flag
			- Value : single, institute
	- organization info
		- p_usr_company
		- p_usr_contact
	- NEW ACCOUNT SET UP 
		- p_usr_username
		- p_usr_password
		- p_usr_password2
	- community type
		- p_usr_community (select)
                  <SELECT NAME="p_usr_community">
                     <OPTION VALUE="Linux PIN #: 1">Linux PIN #: 1
                     <OPTION VALUE="Mathcad PIN #: 2">Mathcad PIN #: 2
                     <OPTION VALUE="Data Mining/Warehouse PIN #:3">Data Mining/Warehouse PIN #:3
                     <OPTION VALUE="Multimedia PIN #: 21">Multimedia PIN #: 21
                     <OPTION VALUE="E-Community Task Force">E-Community Task Force
                     <OPTION VALUE="Mobile Communication PIN #:41">Mobile Communication PIN #:41
                     <OPTION VALUE="Environmental Study">Environmental Study
                     <OPTION VALUE="Database PIN #:82">Database PIN #:82
                     <OPTION VALUE="CS Graduate Admission PIN #:101">CS Graduate Admission PIN #:101
                     <OPTION VALUE="Environmental Problem PIN #:62">Environmental Problem PIN #:62
                     <OPTION VALUE="Ecological Engg. PIN #:63">Ecological Engg. PIN #:63
                     <OPTION VALUE="Wireless Technology PIN #:122">Wireless Technology PIN #:122
                     <OPTION VALUE="Security Control PIN #:143">Security Control PIN #:143
                     <OPTION VALUE="Data/Discrete Structure PIN:22">Data/Discrete Structure PIN:22
                     <OPTION VALUE="Biometrics PIN #:182">Biometrics PIN #:182
                     <OPTION VALUE="Software Engineering PIN #:183">Software Engineering PIN #:183
                     <OPTION VALUE="Data Structure PIN #:202">Data Structure PIN #:202
                     <OPTION VALUE="Robotics PIN #: 222">Robotics PIN #: 222
                  </SELECT>
		- p_community_pin
	-profession
		- p_usr_role
                  <SELECT NAME="p_usr_role">
                     <OPTION VALUE="1">End user
                     <OPTION VALUE="2">System Integrator
                     <OPTION VALUE="3">Solution Provider
                     <OPTION VALUE="4">hardware Vendor
                     <OPTION VALUE="5">Software Developer
                     <OPTION VALUE="6">Driver Developer
                     <OPTION VALUE="7">Database Developer
                     <OPTION VALUE="8">Web developer
                     <OPTION VALUE="9">X-Window Programmer
                     <OPTION VALUE="10">System Administrator
                     <OPTION VALUE="11">Database Administrator
                     <OPTION VALUE="12">Web Administrator
                     <OPTION VALUE="13">Network Administrator
                     <OPTION VALUE="14">Undergraduate Student in a Science/Technical Field
                     <OPTION VALUE="15">Undergraduate Students in a Non Science/Technical Field
                     <OPTION VALUE="16">Graduate Student in a Science/Technical Field
                     <OPTION VALUE="17">Graduate Students in a Non Science/Technical Field
                     <OPTION VALUE="18">Research/Scientist
                     <OPTION VALUE="19">Educator
                     <OPTION VALUE="21">Others
                 </SELECT>		
	-ADDRESS INFORMATION 
		- p_usr_street1
		- p_usr_street2
		- p_usr_apt
		- p_usr_city
		- p_usr_state
		- p_usr_state_symbol
		- p_usr_postal_cd
		- p_usr_country
		- 
		- 
	-TELEPHONE, FAX, EMAIL, AND WWW INFORMATION
		- p_usr_country_code_p
		- p_usr_area_code_p
		- p_usr_phone
		- p_usr_country_code_f
		- p_usr_area_code_f
		- p_usr_fax
		- p_usr_email
		- p_usr_url


