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
      backgroundColor: ['rgba(118,180,250)', 'rgba(181,250,179)', 'rgba(240,152,152)',
        'rgba(250,250,170)', 'rgba(150,250,250)', 'rgba(200,170,250)'
      ],
    },
  ];

  //Dynamic
  meses = [];
  totaisReceitas = [];
  totaisDespesas = [];
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
  barChartData: ChartDataSets[] = [
    { data: this.totaisDespesas, label: 'Despesas' },
    { data: this.totaisReceitas, label: 'Receitas' }
  ];
  anoReferencia: number = 2020;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.configurarGraficoPizza();
    this.confirgurarGraficoDinamic(this.anoReferencia);
  }

  configurarGraficoPizza() {
    this.dashboardService.estatisticasLancamentosPorCategoria()
      .then(dados => {
        this.pieChartLabels = dados.map(dado => dado.categoria.nome);
        this.pieChartData = dados.map(dado => dado.total);
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  confirgurarGraficoDinamic(ano: number) {
    this.dashboardService.estatisticasLancamentosPorMes(ano, 0)
      .then(response => {
        let receitas = response.filter(dado => dado.tipo === 'RECEITA');
        let despesas = response.filter(dado => dado.tipo === 'DESPESA');
        for(let i=0;i<12;i++){
          this.totaisReceitas.push(receitas[i].total);
          this.totaisDespesas.push(despesas[i].total);
        }
        this.barChartData = [
          { data: this.totaisDespesas, label: 'Despesas' },
          { data: this.totaisReceitas, label: 'Receitas' }
        ];
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
}
