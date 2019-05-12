import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private modal: ModalController
  ) {}
  async sub(){
    const modal = await this.modal.create({
      component: LoginComponent
    });
    return await modal.present();
  }
}
