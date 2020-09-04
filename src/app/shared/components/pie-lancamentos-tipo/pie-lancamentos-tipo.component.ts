import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-lancamentos-tipo',
  templateUrl: './pie-lancamentos-tipo.component.html',
  styleUrls: ['./pie-lancamentos-tipo.component.css']
})
export class PieLancamentosTipoComponent implements OnInit {

  @Input() receitas: number;
  @Input() despesas: number;
  @ViewChild( BaseChartDirective ) chart: BaseChartDirective;
  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  pieChartLabels: Label[] = ['Receitas', 'Despesas'];
  pieChartData: SingleDataSet = [0,0];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];
  pieChartColors = [
    {
      backgroundColor: ['rgb(163, 201, 245)', 'rgb(238, 160, 160)'],
    },
  ];
  loading = true;

  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      this.loading = false;
    },900);
    setTimeout(()=>{
      this.pieChartData = [this.receitas, this.despesas];
    },1000);
  }

}
