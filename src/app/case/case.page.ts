import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProxyService } from '../proxy.service';

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
  }
  submitRating() {
    let options = {
      p_attachOrReply: 'Send-Rating',
      p_rating_level: this.p_rating_level,
      p_rating_quality: this.p_rating_quality
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
