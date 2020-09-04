import { Component, Input, AfterViewInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-pie-lancamentos-categoria',
  templateUrl: './pie-lancamentos-categoria.component.html',
  styleUrls: ['./pie-lancamentos-categoria.component.css']
})
export class PieLancamentosCategoriaComponent implements AfterViewInit {

  @Input() labels: any[];
  @Input() data: any[];
  @Input() title: string;
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
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [
    {
      backgroundColor: ['rgba(118,180,250)', 'rgba(181,250,179)', 'rgba(240,152,152)',
        'rgba(250,250,170)', 'rgba(150,250,250)', 'rgba(200,170,250)'
      ],
    },
  ];

  constructor() { }

  ngAfterViewInit() {}

}
