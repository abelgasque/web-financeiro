import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { DashboardService } from '../dashboard.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  // Pie
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
  pieChartLabels: Label[] = [];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [
    {
      backgroundColor: ['rgba(118,180,250)', 'rgba(181,250,179)','rgba(240,152,152)',
      'rgba(250,250,170)', 'rgba(150,250,250)','rgba(200,170,250)'
      ],
    },
  ];

  //Dynamic
  diasDoMes = [];
  totaisReceitas = [];
  totaisDespesas=[];
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartData: ChartDataSets[] = [
    { data: this.totaisDespesas, label: 'Despesas'},
    { data: this.totaisReceitas, label: 'Receitas'}
  ];
  
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
   this.configurarGraficoPizza();
   this.confirgurarGraficoDinamic();
  }
  
  configurarGraficoPizza(){
    this.dashboardService.estatisticasLancamentosPorCategoria()
    .then(dados =>{
      this.pieChartLabels = dados.map(dado => dado.categoria.nome);
      this.pieChartData = dados.map(dado => dado.total);
    })
    .catch(erro =>{
      console.log(erro);
    });
  }

  confirgurarGraficoDinamic(){
    this.dashboardService.estatisticasLancamentosPorDia()
    .then(response =>{
      this.configurarDiasMes();
      this.totaisReceitas = this.totalPorCadaDiaMes(response.filter(dado => dado.tipo === 'RECEITA'), this.diasDoMes);
      this.totaisDespesas = this.totalPorCadaDiaMes(response.filter(dado => dado.tipo === 'DESPESA'), this.diasDoMes);
        this.barChartData = [
          { data: this.totaisDespesas, label: 'Despesas'},
          { data: this.totaisReceitas, label: 'Receitas'}
        ];
    })
    .catch(erro =>{
      console.log(erro);
    });
  }

  private totalPorCadaDiaMes(dados, diasDoMes){
    let totais: number[] = [];
    for(const dia of diasDoMes){
      let total = 0;
      for(const dado of dados){
        if(dado.dia.getDate() === dia){
          total = dado.total;
          break;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  private configurarDiasMes(){
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth()-1);
    mesReferencia.setDate(0);
    const quantidade = mesReferencia.getDate();
    for(let i=1; i<=quantidade; i++){
      this.barChartLabels.push(`${i}`);
      this.diasDoMes.push(i);
    }
  }
  
  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}
