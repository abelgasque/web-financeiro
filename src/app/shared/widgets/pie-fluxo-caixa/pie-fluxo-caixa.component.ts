import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-pie-fluxo-caixa',
  templateUrl: './pie-fluxo-caixa.component.html',
  styleUrls: ['./pie-fluxo-caixa.component.css']
})
export class PieFluxoCaixaComponent implements OnInit {

    Highcharts = Highcharts;
    chartOptions: {};

    @Input() title: string;
    @Input() data = [];

    constructor() { }

    ngOnInit(): void {
        this.chartOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: this.title
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: this.data
        }]
        };

        HC_exporting(Highcharts);
        
        setTimeout(()=>{
        window.dispatchEvent(new Event('resize'));   
        }, 300);
    }
}
