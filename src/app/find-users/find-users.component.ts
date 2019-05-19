import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-users',
  templateUrl: './find-users.component.html',
  styleUrls: ['./find-users.component.scss'],
})
export class FindUsersComponent implements OnInit {

  users;
  constructor(
    private route: ActivatedRoute
  ) { 
    this.route.data.subscribe(
      (res) => {
        let a = res;
        if (res.proxy.error) {
          console.log(res.proxy.error);
          return;
        } else {
          this.users = res.proxy;
        }
      }, (err) => {
        console.log(err);
      }
    )
  }

  ngOnInit() {}

}
