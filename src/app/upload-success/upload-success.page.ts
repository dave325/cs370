import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-success',
  templateUrl: './upload-success.page.html',
  styleUrls: ['./upload-success.page.scss'],
})
export class UploadSuccessPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toHome()
  {
    this.router.navigateByUrl('home');
  }

}
