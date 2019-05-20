import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProxyService } from '../proxy.service';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private proxyService: ProxyService, private toastController: ToastController) {
      
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Could not sign up at this moment, please try again later.',
      duration: 2400
    });
    toast.present();
  }


  register(form)
  {

    
  
      this.proxyService.registerUser(form.value).toPromise().then(
        (res)=>
        {
            this.router.navigateByUrl('home');
        },
        (err) =>
        {
            this.presentToast();
        }
      )

      



  }



  ngOnInit() {
  }

}
