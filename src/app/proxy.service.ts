import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Config } from '@ionic/angular';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';


@Injectable({
  providedIn: 'root'
})
export class ProxyService implements Resolve<any> {
  private _url: string = "";
  private type: number;
  private httpOptions;
  private id;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route.routeConfig.path);
    console.log(this.ENDPOINTS.getByID);
    console.log(route.params.id);
    if (route.routeConfig.path === "case/:id") {
      return this.getCaseBy(this.ENDPOINTS.getByID,
        { p_case_select: route.params.id }
      );
    }
    if(route.routeConfig.path === "listUsers"){
      return this.getUsers();
    }
  }

  public ENDPOINTS = {
    getByName: 'http://149.4.223.218:3000/api/search/name',
    getByID: 'http://149.4.223.218:3000/api/search/id',
    getByKeyword: 'http://149.4.223.218:3000/api/search/keyword',
    getByDate: 'http://149.4.223.218:3000/api/search/date',
    caseAction: 'http://149.4.223.218:3000/api/SearchResultFile',
    register: 'http://149.4.223.218:3000/api/register',
    caseUpload: 'http://149.4.223.218:3000/api/caseUpload'

  }


  private getDecodedId(): String {
    if (this.getToken()) {
      try {
        //   var decoded = jwt_decode(this.getToken());
      } catch (Error) {
        console.log(Error);
        return null;
      }
      //  return decoded._id + decoded.iat.toString();
    }
  }
  /**
   * 
   * @param user 
   * @param token 
   */
  public setUser(user, token: String = null) {
    if (token) {
      this.setToken(token);
    }
    if (this.getDecodedId() != null) {
      window.sessionStorage.setItem('user_' + this.getDecodedId(), JSON.stringify(user));
    }
  }

  /**
   * 
   * @param token 
   */
  private setToken(token) {
    window.sessionStorage.setItem('token', JSON.stringify(token));
  }

  /**
   * 
   */
  public getToken() {
    return JSON.parse(window.sessionStorage.getItem('token'));
  }

  /**
   * 
   */
  public getUser() {

    return JSON.parse(window.sessionStorage.getItem('user_' + this.getDecodedId()));
  }

  public logout() {
    window.sessionStorage.removeItem('user_' + this.getDecodedId());
    window.sessionStorage.removeItem('token');
  }

  public getCaseBy(endpoint: string, info: any) {
    return this.http.post('http://149.4.223.218:3000/api/login', {}).toPromise().then(

      (res: any) => {

        var credentialsAsJSON = res;

        var postParams = info;
        postParams.p_session_id = res.p_session_id;
        postParams.p_community_id = res.p_community_id;
        return this.http.post(endpoint, postParams).toPromise().then(
          (res: any) => {
            return res;
          },
          (err) => {
            console.log("COULD NOT RETRIEVE CASES BY NAME");
            return {};
          }
        );

      },
      (err) => {
        console.log("COULD NOT PERFORM LOGIN FUNCTIONALITY");
        console.log(err);
      }

    );


  }

  public downloadFile(endpoint: string, info: any) : Promise<void | Observable<HttpResponse<Config>>>{
    return this.http.post('http://149.4.223.218:3000/api/login', {}).toPromise().then(

      (res: any) => {

        var credentialsAsJSON = res;

        var postParams = info;
        postParams.p_session_id = res.p_session_id;
        postParams.p_community_id = res.p_community_id;
        return this.http.post<HttpResponse<Config>>(endpoint, postParams, { observe: 'response' as 'body', responseType:'blob' as 'json' });

      },
      (err) => {
        console.log("COULD NOT PERFORM LOGIN FUNCTIONALITY");
        console.log(err);
      }

    );

  }

  public getUsers(){
    return this.http.post('http://149.4.223.218:3000/api/login', {}).toPromise().then(

      (res: any) => {

        var credentialsAsJSON = res;

        var postParams = {
          p_session_id : res.p_session_id,
          p_community_id : res.p_community_id
        };
        return this.http.post("http://149.4.223.218:3000/api/CommunityUserList", postParams).toPromise();

      },
      (err) => {
        console.log("COULD NOT PERFORM LOGIN FUNCTIONALITY");
        console.log(err);
      }

    );
  }

  registerUser(form) {


    let f = form.value;

    console.log("REGISTERING USER WITH VALUES: ");

    /*
    p_usr_lname: req.body.p_usr_lname ,
    p_usr_fname: req.body.p_usr_fname ,
    p_usr_username: req.body.p_usr_username ,
    p_usr_password: req.body.p_usr_password ,
    p_usr_password2: req.body.p_usr_password2 ,
    p_usr_community: req.body.p_usr_community ,
    p_community_pin: req.body.p_community_pin ,
    p_usr_email: req.body.p_usr_email ,
    p_usr_title: req.body.p_usr_title ,
    p_usr_jobtitle: req.body.p_usr_jobtitle ,
    p_usr_flag: req.body.p_usr_flag ,
    p_usr_company: req.boWdy.p_usr_company ,
    p_usr_contact: req.body.p_usr_contact ,
    p_usr_role: req.body.p_usr_role ,
    p_usr_street1: req.body.p_usr_street1 ,
    p_usr_street2: req.body.p_usr_street2 ,
    p_usr_apt: req.body.p_usr_apt ,
    p_usr_city: req.body.p_usr_city ,
    p_usr_state: req.body.p_usr_state ,
    p_usr_state_symbol: req.body.p_usr_state_symbol ,
    p_usr_postal_cd: req.body.p_usr_postal_cd ,
    p_usr_country: req.body.p_usr_country ,
    p_usr_country_code_p: req.body.p_usr_country_code_p ,
    p_usr_area_code_p: req.body.p_usr_area_code_p ,
    p_usr_phone: req.body.p_usr_phone ,
    p_usr_country_code_f: req.body.p_usr_country_code_f ,
    p_usr_area_code_f: req.body.p_usr_area_code_f ,
    p_usr_fax: req.body.p_usr_fax ,
    p_usr_url: req.body.p_usr_email 
    */

    console.log(f);
    f.p_usr_role=14;
    f.p_usr_community="Software Engineering PIN #:183";
    return this.http.post(this.ENDPOINTS.register,
        f
    );

  }

  uploadCase(formData)
  {

    console.log("UPLOADING CASE WITH VALUES: ");
    console.log(formData);
    return this.http.post(this.ENDPOINTS.caseUpload,
        formData
    );

  }
}
