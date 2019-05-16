import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  caseList = [];

  public items: Array<{ title: string; note: string; icon: string, url:string }> = [];
  constructor(
    private route: ActivatedRoute
  ) {
    for (var i = 1; i < 11; i++) {
     
    }
  }

  ngOnInit() {
    
    this.route.data.toPromise().then(
      (res) =>{

        console.log('GETTING RESULTS');
        console.log(res);

        
      },
      (err)=>
      {
        console.log('GETTING RESULTS');

        console.log(err);
      }
    )
  }
 
  
}
