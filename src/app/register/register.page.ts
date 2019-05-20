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


  async presentToastOnFailureToRegister() {
    const toast = await this.toastController.create({
      message: 'Could not sign up at this moment, please try again later.',
      duration: 2800,
    });
    toast.present();
  }


  async presentToastOnFailureToHaveSamePasswords() {
    const toast = await this.toastController.create({
      message: 'Passwords do not match!',
      duration: 3000,
    });
    toast.present();
  }



  register(form)
  {

      let pass1 = form.value.p_usr_password;
      let pass2 = form.value.p_usr_password2;

      console.log(pass1);
      console.log(pass2);
      if(pass1 !== pass2)
      {
          this.presentToastOnFailureToHaveSamePasswords();
          return;
      }

      else{

        this.proxyService.registerUser(form.value).toPromise().then(
          (res)=>
          {
              this.router.navigateByUrl('register-success');
          },
          (err) =>
          {
              this.presentToastOnFailureToRegister();
          }
        );

      }

      

      



  }



  ngOnInit() {
  }

}
