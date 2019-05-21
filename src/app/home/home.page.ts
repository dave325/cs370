import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private modal: ModalController,private router:Router
  ) {}
  async sub(){
    var  modal = await this.modal.create({
      component: LoginComponent
    });
    return await modal.present();
  }

  toAbout()
  {
    this.router.navigateByUrl('about')
  }

  toView()
  {
    this.router.navigateByUrl('list')
  }

  toUpload()
  {
    this.router.navigateByUrl('upload')
  }

  toRegister()
  {
    this.router.navigateByUrl('register')
  }


  toUsers()
  {
    this.router.navigateByUrl('listUsers')
  }
}
