import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-big-chart-lancamentos-mesal',
  templateUrl: './big-chart-lancamentos-mesal.component.html',
  styleUrls: ['./big-chart-lancamentos-mesal.component.css']
})
export class BigChartLancamentosMesalComponent implements OnInit {

  @Input() ano: number;
  @Input() receitas: any[];
  @Input() despesas: any[];
  @ViewChild( BaseChartDirective ) chart: BaseChartDirective;
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  barChartLabels: Label[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Despesas' },
    { data: [], label: 'Receitas' }
  ];
  pieChartColors = [
    {
      backgroundColor: ['rgb(163, 201, 245)', 'rgb(238, 160, 160)'],
    },
  ];
  loading = true;

  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
       this.barChartData = [
        { data: this.despesas, label: 'Despesas' },
        { data: this.receitas, label: 'Receitas' }
      ];
      this.loading = false;
    }, 1000);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}
