import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-teste-curso',
  templateUrl: './teste-curso.component.html',
  styleUrls: ['./teste-curso.component.css']
})
export class TesteCursoComponent implements OnInit {

  chartArea = [];
  chartPie = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.chartArea = this.dashboardService.chartAreaLancamentos();
    this.chartPie = this.dashboardService.chartPieLancamentos();
  }

}
