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
  caseList;
  session;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string, url:string }> = [];
  constructor(
    private route: ActivatedRoute
  ) {
    for (var i = 1; i < 11; i++) {
      this.items.push({
        title: 'Case ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        url: '"' + i + '"'
      });
    }
  }

  ngOnInit() {
    this.route.data.subscribe(
      (res) =>{
        this.session = res.proxy.slice(0,1);
        this.caseList = res.proxy.slice(1,5);
        console.log(this.caseList)
      }
    )
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
