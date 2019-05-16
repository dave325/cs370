import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ProxyService } from '../proxy.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  caseList:Array<any>;

  constructor(
    private route: ActivatedRoute, private proxyService: ProxyService
  ) {
    
  }

  ngOnInit() {
    
    this.proxyService.getCaseBy(this.proxyService.ENDPOINTS.getByName,
      {
        p_lname : "sy",
        p_fname : ""
      }
    ).then(
      (res:any)=>
      {
        console.log(res);
        let tmp = res;
        tmp.unshift();
        var i = tmp.length;
        while(i--)
        {

          let element = tmp[i];
          if(element.p_session){
            tmp.splice(i,1);
          }
        }

        this.caseList = tmp;

 
      }
    );
  }
 
  
}
