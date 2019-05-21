import { Config } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProxyService } from '../proxy.service';
import { declareTypeAlias } from 'babel-types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-case',
  templateUrl: './case.page.html',
  styleUrls: ['./case.page.scss'],
})
export class CasePage implements OnInit {

  str;
  case;
  p_rating_level;
  p_rating_quality;
  constructor(
    private route: ActivatedRoute,
    private proxy: ProxyService
  ) {
    this.str = this.route.snapshot.params.id;
    console.log(this.str);
    this.route.data.subscribe(
      (res) => {
        let a = res;
        if (res.proxy.error) {
          console.log(res.proxy.error);
          return;
        } else {
          this.case = res.proxy;
          console.log(this.case)
        }
      }, (err) => {
        console.log(err);
      }
    )
  }

  ngOnInit() {
  }
  onSelectChange(ev) {
    console.log(ev);
    let options = {
      p_attachOrReply: 'Get-attachment',
      p_media_select: "ole",
      p_attach_ole: ev.detail.value,
      p_case_id: this.str
    }
    this.proxy.downloadFile(this.proxy.ENDPOINTS.caseAction, options).then(
      (response) => {
        if (response instanceof Observable) {
          response.subscribe(
            (res) => {
              console.log(res);
              //var blob = new Blob([res.body], { type: res.headers.get("content-type") });
              var blob = res.body;
              // IE doesn't allow using a blob object directly as link href
              // instead it is necessary to use msSaveOrOpenBlob
              if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob);
                return;
              }

              // For other browsers: 
              // Create a link pointing to the ObjectURL containing the blob.
              const data = window.URL.createObjectURL(blob);

              var link = document.createElement('a');
              link.href = data;
              console.log()
              link.download = ev.detail.value;
              // this is necessary as link.click() does not work on the latest firefox
              link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

              setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
              }, 100);
              console.log('done')
            },
            (err) => {
              console.log("COULD NOT RETRIEVE CASES BY NAME");
              console.log(err);
              return err;
            }
          );
        }
        /*
          .subscribe(
            (res) => {
              var blob = new Blob([response.body], { type: response.headers.get("content-type") });
              const url = window.URL.createObjectURL(blob);
              window.open(url);
              // var fileName = headers('content-disposition');
              //saveAs(blob, fileName);
            }, (err) => {
              console.log(err);
            }
          )
          */
      },
      (err) => {
        console.log(err);
      }
    )
  }
  submitRating() {
    let options = {
      p_attachOrReply: 'Send-Rating',
      p_rating_level: this.p_rating_level,
      p_rating_quality: this.p_rating_quality,
      p_case_id: this.str
    }
    this.proxy.getCaseBy(this.proxy.ENDPOINTS.caseAction, options).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
