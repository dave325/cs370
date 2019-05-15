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
  }

  ngOnInit() {
  }

}
