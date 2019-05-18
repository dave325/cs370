import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-case',
  templateUrl: './case.page.html',
  styleUrls: ['./case.page.scss'],
})
export class CasePage implements OnInit {

  str;
  constructor(private route: ActivatedRoute) { 
    this.str = this.route.snapshot.params.id;
    console.log(this.str);
    this.route.data.subscribe(
      (res) =>{
        if(res.error){
          console.log(res.error);
          return;
        }
        res.then(
          (res) => {
            console.log(res);
          }, 
          (err) => {
            console.log(err);
          }
        )
      }, (err) => {
        console.log(err);
      }
    )
  }

  ngOnInit() {
  }

}
