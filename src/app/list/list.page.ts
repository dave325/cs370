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
    console.log("QUERY IS " + this.searchQuery);


    if(this.choice ===  'id')
    {
      this.doSearch(this.proxyService.ENDPOINTS.getByID,{
        case_id : this.searchQuery,

      });
      
    }

    if(this.choice === 'lastname')
    {
      this.doSearch(this.proxyService.ENDPOINTS.getByName,{
        p_lname : this.searchQuery,
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
    this.caseList = [];
    this.proxyService.getCaseBy(endpoint,
      info
    ).then(
      (res:any)=>
      {

        
      
        console.log(res);

        var i = res.length;
        while(i--)
        {

          let element = res[i];
          if(Object.keys(element).length > 1){
            this.caseList.push(element);
          }
        }

       this.caseList.reverse();
 
      }
    );

  }

  ngOnInit() {

    this.doSearch(this.proxyService.ENDPOINTS.getByName,{
      p_lname : "Khemraj",
      p_fname : ""
    });
    
    
  }
 
  
}
