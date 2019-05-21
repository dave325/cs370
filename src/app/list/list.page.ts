import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { createHostListener } from '@angular/compiler/src/core';
import { ProxyService } from '../proxy.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})




export class ListPage implements OnInit {
  private selectedItem: any;
  caseList: Array<any>;
  error;
  info;

  constructor(
    private route: Router, private proxyService: ProxyService,
  ) {

  }

  searchQuery;
  searchChoice;
  p_from_date;
  p_to_date;
  p_increment_date;
  choice = 'lastname';


  search($event: any) {

    console.log("CHOICE IS " + this.choice);
    console.log("QUERY IS " + this.searchQuery);

    if (this.searchQuery == undefined) {
      this.info = null;
      this.error = "Please add something in the search query";
      return;
    }
    this.error = null;
    if (this.choice == undefined) {
      this.choice = 'lastname';
    }
    if (this.choice === 'id') {
      this.doSearch(this.proxyService.ENDPOINTS.getByID, {
        p_case_select: this.searchQuery

      });

    }

    if (this.choice === 'lastname') {
      this.doSearch(this.proxyService.ENDPOINTS.getByName, {
        p_lname: this.searchQuery,
        p_fname: ""
      });
    }

    if (this.choice === 'keyword') {

      this.doSearch(this.proxyService.ENDPOINTS.getByKeyword, {
        p_keyword: this.searchQuery,
        p_s_choice: 3
      });
    }

  }


  doSearch(endpoint: string, info: any) {
    this.caseList = [];
    this.proxyService.getCaseBy(endpoint,
      info
    ).then(
      (res: any) => {
        this.caseList = [];
        var i = res.length;
        if (this.choice === "id") {
          this.route.navigate(['/case/' + info.p_case_select]);
        }
        while (i--) {

          let element = res[i];
          if (Object.keys(element).length > 1) {
            if (element.Author.length > 0) {
              this.caseList.push(element);
            }
          }
        }


        if (this.caseList.length === 0) {
          this.info = null;
          this.error = "No Cases Found!"
        } else {
          this.error = null;
          this.caseList.reverse();
        }
      }, (err) => {
        console.log(err);
        this.info = null;
        this.error = "There was an error searching for cases. Please try later.";
      }
    );

  }
  submitDate() {
    let info = {
      p_from_date: this.p_from_date,
      p_to_date: this.p_to_date,
      p_increment_date: this.p_increment_date
    };
    this.proxyService.getCaseBy(this.proxyService.ENDPOINTS.getByDate, info)
      .then(
        (res) => {
          this.caseList = [];
          var i = res.length;
          while (i--) {

            let element = res[i];
            console.log(element);
            if (Object.keys(element).length > 1) {
              if (element.Author.length > 0) {
                this.caseList.push(element);
              }
            }
          }


          if (this.caseList.length === 0) {
            this.info = null;
            this.error = "No Cases Found!"
          } else {
            this.error = null;
            this.caseList.reverse();
          }
        }, (err) => {
          console.log(err);
          this.info = null;
          this.error = "There was an error searching for cases. Please try later.";
        }
      )
  }
  ngOnInit() {



  }


}
