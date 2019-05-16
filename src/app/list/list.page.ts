import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Route, createHostListener } from '@angular/compiler/src/core';
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

  searchQuery;
  searchChoice;
  choice = 'lastname';

  
  search($event:any)
  {

    console.log("CHOICE IS " + this.choice);
    console.log(this.searchQuery);


    if(this.choice ===  'id')
    {
      this.doSearch(this.proxyService.ENDPOINTS.getByID,{
        p_lname : this.searchQuery,

      });
      
    }

    if(this.choice === 'lastname')
    {
      console.log(this.searchQuery);
      this.doSearch(this.proxyService.ENDPOINTS.getByName,{
        p_lname : "khemraj",
        p_fname : ""
      });
    }

    if(this.choice === 'keyword')
    {

      this.doSearch(this.proxyService.ENDPOINTS.getByKeyword,{
        p_keyword : this.searchQuery
      });
    }

  }


  doSearch(endpoint:string, info:any)
  {
    this.proxyService.getCaseBy(endpoint,
      info
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

  ngOnInit() {

    this.doSearch(this.proxyService.ENDPOINTS.getByName,{
      p_lname : "sy",
      p_fname : ""
    });
    
    
  }
 
  
}
