import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


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

    
    
  
  }

  public ENDPOINTS = {
    getByName : 'http://149.4.223.218:3000/api/search/name',
    getByID : 'http://149.4.223.218:3000/api/search/id',
    getByKeyword: 'http://149.4.223.218:3000/api/search/keyword',

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

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin', '*');
    return this.http.post('http://149.4.223.218:3000/api/login', {}).toPromise().then(

      (res: any) => {

        var credentialsAsJSON = res;

        var postParams =info;
        postParams.p_session_id = credentialsAsJSON.p_session_id;
        postParams.p_community_id = credentialsAsJSON.p_community_id;

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
}
