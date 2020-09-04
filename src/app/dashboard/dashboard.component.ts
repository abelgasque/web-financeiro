import { Component, OnInit } from '@angular/core';
import { AuthService } from '../seguranca/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sideBarOpen: boolean = false;

  constructor(public auth: AuthService) { }

  ngOnInit() { }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
