import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProxyService } from '../proxy.service';
import { declareTypeAlias } from 'babel-types';

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
    this.proxy.getCaseBy(this.proxy.ENDPOINTS.caseAction, options).then(
      (response) => {
        console.log(response);
        var data = response.data;
        var headers = response.headers;
        var blob = new Blob([response.data], { type: headers['content-type'] });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        // var fileName = headers('content-disposition');
        //saveAs(blob, fileName);
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
