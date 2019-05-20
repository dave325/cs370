import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.page.html',
  styleUrls: ['./register-success.page.scss'],
})
export class RegisterSuccessPage implements OnInit {

  constructor(private router:Router) { }

  toHome()
  {
    this.router.navigateByUrl('home');
  }

  ngOnInit() {
  }

}
