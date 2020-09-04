import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import { Router, NavigationEnd, NavigationCancel, NavigationError, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-chart-pie-lancamentos-tipo',
  templateUrl: './chart-pie-lancamentos-tipo.component.html',
  styleUrls: ['./chart-pie-lancamentos-tipo.component.css']
})
export class ChartPieLancamentosTipoComponent implements OnInit {

  @Input() idPessoa: number = 0;
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
      backgroundColor: ['rgba(118,180,250)', 'rgba(250, 107, 107)'],
    },
  ];
  receitas: number = 0.0;
  despesas: number = 0.0;
  displaySpinner: boolean = false;
  public routeLoading: boolean = false;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
    ) { 
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.routeLoading = true;
        }
  
        if (event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError) 
        {
          if(this.idPessoa != null || this.idPessoa != undefined || this.idPessoa > 0){
            this.configurarGraficoPizzaAndCards(this.idPessoa);
          }
            this.routeLoading = false;
        }
      });
    }
    
  ngOnInit(): void {
    
  }

  configurarGraficoPizzaAndCards(id: number) {
    this.dashboardService.estatisticasLencamentosPorPessoaById(id)
      .then(dados => {
        if (dados.length > 0) {
          this.pieChartLabels = dados.map(dado => dado.tipo);
          this.pieChartData = dados.map(dado => dado.total);
          for (let i = 0; i < dados.length; i++) {
            if (dados[i].tipo == "RECEITA" && dados[i].total > 0) {
              this.receitas = dados[i].total;
            }
            if (dados[i].tipo == "DESPESA" && dados[i].total > 0) {
              this.despesas = dados[i].total;
            }
          }
        }
      })
      .catch(erro => {
        console.log(erro);
      });
  }
}
