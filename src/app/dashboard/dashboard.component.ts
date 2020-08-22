import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  index: number = 0;
  sideBarOpen:boolean = false;

  constructor(
  ) { }

  ngOnInit() {}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  openNext() {
    this.index = (this.index === 3) ? 0 : this.index + 1;
  } 

  openPrev() {
      this.index = (this.index <= 0) ? 3 : this.index - 1;
  }
}
