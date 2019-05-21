import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProxyService } from '../proxy.service';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  constructor(private router: Router, private proxyService: ProxyService, private toastController: ToastController) {

  }


  async presentToastOnFailureToUploadCase() {
    const toast = await this.toastController.create({
      message: 'Could not upload the case at this moment, please try again later!',
      duration: 2800,
      position:'middle'
    });
    toast.present();
  }

  p_sig = 215;

  doUpload(form) {

    let formVal = form.value;
    formVal.p_sig = this.p_sig;

    this.proxyService.uploadCase(formVal).toPromise().then(
      (res) => {
        this.router.navigateByUrl('upload-success');
      },
      (err) => {
        this.presentToastOnFailureToUploadCase();
      }
    );

  }

  ngOnInit() {
  }

}
