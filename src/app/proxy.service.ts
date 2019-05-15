import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {
  private _url: string = "";
  private type: number;
  private httpOptions;
  private id;
  constructor(
    private http: HttpClient
  ) { }

  login(user): Promise<any> {
    let headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Credentials", "true");
    headers.append("Access-Control-Allow-Origin", "*");
    return this.http.post('/api/login', { username: user.p_usr_username, password: user.p_usr_password }, { headers: headers }).toPromise();
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
}
