import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-case',
  templateUrl: './case.page.html',
  styleUrls: ['./case.page.scss'],
})
export class CasePage implements OnInit {

  str;
  case;
  constructor(private route: ActivatedRoute) {
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

}
