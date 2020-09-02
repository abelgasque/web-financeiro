import { Component, OnInit } from '@angular/core';
import { AuthService } from '../seguranca/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  sideBarOpen:boolean = false;

  constructor(public auth: AuthService) { }

  ngOnInit() {}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
