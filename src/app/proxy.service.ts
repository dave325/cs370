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

    var headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Credentials", "true");
    //headers.append("Access-Control-Allow-Origin", "http://localhost:8100");
    return this.http.post('http://149.4.223.218:3000/api/login', {}, { headers: headers ,withCredentials:true});
  
    //return this.getCaseByName();
  }
  login(): Promise<any> {
    var headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("Access-Control-Allow-Origin", "*");
    return this.http.post('/api/login', {}, { headers: headers ,withCredentials:true}).toPromise();
  }
  /**
  * 
  */
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

  public getCaseByName() {


    return this.http.post('http://149.4.223.218:3000/api/login', {}).toPromise().then(

      (res: any) => {


        var credentialsAsJSON = JSON.parse(res);
        console.log(res);

        return this.http.post('http://149.4.223.218:3000/api/search/name', {

          p_lname: "Sy",
          p_fname: "",
          p_session: credentialsAsJSON.p_session_id,
          p_community_id: 183

        }).toPromise().then(
          (res: any) => {
            return JSON.parse(res);
          },
          (err) => {
            console.log("COULD NOT RETRIEVE CASES BY NAME");
            return 100;

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
