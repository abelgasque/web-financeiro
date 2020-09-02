import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-pessoa',
  templateUrl: './dashboard-pessoa.component.html',
  styleUrls: ['./dashboard-pessoa.component.css']
})
export class DashboardPessoaComponent implements OnInit {
  
  chartArea = [];
  chartPie = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.chartArea = this.dashboardService.chartAreaLancamentos();
    this.chartPie = this.dashboardService.chartPieLancamentos();
  }

}
