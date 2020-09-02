import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-cards-fluxo-caixa',
  templateUrl: './cards-fluxo-caixa.component.html',
  styleUrls: ['./cards-fluxo-caixa.component.css']
})
export class CardsFluxoCaixaComponent implements OnInit {

  @Input() label : string;
  @Input() total : string;
  @Input() percentual : string;
  Highcharts = Highcharts;
  chartOptions: {};

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'area',
        backgroundColor: null,
        borderWidth: 0,
        margin: [2,2,2,2],
        heigth: 60
      },
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      tooltip: {
        split: true,
        outside: true
      },
      legend:{
        enabled: false
      },
      credits:{
        enabled: false
      },
      exporting: {
        enabled: false
      },
      xAxis: {
        labels:{
          enabled: false
        },
        title:{
          text: null
        },
        startOnTick: false,
        endOnTick:false,
        tickOptions:[]
      },
      yAxis: {
        labels:{
          enabled: false
        },
        title:{
          text: null
        },
        startOnTick: false,
        endOnTick:false,
        tickOptions:[]
      },
      series: [{
        data: [71, 12, 54, 12, 231],
      }]
    };

    HC_exporting(Highcharts);
    
    setTimeout(()=>{
       window.dispatchEvent(new Event('resize'));   
    }, 300);
  }

}
