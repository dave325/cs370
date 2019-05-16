import { ProxyService } from './../proxy.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formData = {
    p_usr_username: "",
    p_usr_password: ""
  }
  constructor(
    private proxyService: ProxyService 
  ) { }

  ngOnInit() {}

  submit(){
    /*
    this.proxyService.login(this.formData).then(
      (res) =>{
        console.log(res)
      },
      (err) => {
        console.log(err);
      }
    )
    */
  }
}
