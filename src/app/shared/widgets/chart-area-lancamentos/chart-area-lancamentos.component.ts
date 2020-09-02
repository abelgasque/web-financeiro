import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-chart-area-lancamentos',
  templateUrl: './chart-area-lancamentos.component.html',
  styleUrls: ['./chart-area-lancamentos.component.css']
})
export class ChartAreaLancamentosComponent implements OnInit {

    @Input() lancamentos: any[];
    @Input() title: string;

    Highcharts = Highcharts;
    chartOptions: {};

    constructor() { }

    ngOnInit(): void {
        this.chartOptions = {
        chart: {
            type: 'area'
            },
            title: {
                text: this.title
            },
            subtitle: {
                text: null
            },
            tooltip: {
                split: true,
                valueSuffix: ' total'
            },
            credits:{
                enabled: false
            },
            exporting: {
                enabled: true
            },
            series:  this.lancamentos
        };

        HC_exporting(Highcharts);
        
        setTimeout(()=>{
        window.dispatchEvent(new Event('resize'));   
        }, 300);
    }

}
