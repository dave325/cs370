import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor(
    private http: HttpClient
  ) { }

  login(user): Promise<any>{
    let headers = new HttpHeaders();
    headers.append( "Access-Control-Allow-Credentials", "true");
    headers.append("Access-Control-Allow-Origin", "*");
    return this.http.post('/api/login', {username: user.p_usr_username, password: user.p_usr_password},{headers:headers} ).toPromise();
  }
}
