import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {


  totaisReceitas = [];
  totaisDespesas = [];
  anoReferencia: number = 2020;

  pieChartLabels: any[] = [];
  pieChartData: any[] = [];
  
  constructor(private dashboardService: DashboardService) {
    this.configurarGraficoPizza();
    this.confirgurarGraficoDinamic(this.anoReferencia);
  }

  ngOnInit(): void { }

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
        if (response.length > 0) {
          for (let i = 0; i < response.length; i++) {
            if (response[i].tipo == "RECEITA") {
              this.totaisReceitas.push(response[i].total);
            } else {
              this.totaisDespesas.push(response[i].total);
            }
          }
        }else{
          this.totaisDespesas = [];
          this.totaisReceitas = [];
        }
      })
      .catch(erro => {
        console.log(erro);
      });
  }
}
