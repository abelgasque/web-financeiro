import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-cards-header-dashboard',
  templateUrl: './cards-header-dashboard.component.html',
  styleUrls: ['./cards-header-dashboard.component.css']
})
export class CardsHeaderDashboardComponent implements AfterViewInit {

  @Input() valor: number;
  @Input() title: string;

  constructor() { }

  ngAfterViewInit(): void {
  }

}
