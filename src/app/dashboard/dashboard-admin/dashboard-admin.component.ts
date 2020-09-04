import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  displayChartDinamic: boolean = true;
  displayChartPieCategoria: boolean = true;
  displayChartPieTipo: boolean = true;
  totaisReceitas = [];
  totaisDespesas = [];
  anoReferencia: number = 2020;

  pieChartLabels: any[] = [];
  pieChartData: any[] = [];
  receitas: number = 0.0;
  despesas: number = 0.0;

  constructor(private dashboardService: DashboardService) {
    this.configurarGraficoPiePorCategoria();
    this.confirgurarGraficoDinamic(this.anoReferencia);
    this.configurarGraficoPiePorTipo();
  }

  ngOnInit(): void { }

  configurarGraficoPiePorTipo() {
    this.dashboardService.estatisticasLancamentosPorTipoMensal()
      .then(dados => {
        console.log(dados);
        if (dados.length>0) {
          for (let i = 0; i < dados.length; i++) {
            if(dados[i].tipo === 'RECEITA'){
              this.receitas += dados[i].total;
            }else{
              this.despesas += dados[i].total;
            }
          }
          console.log(this.receitas);
          console.log(this.despesas);
        }
        this.displayChartPieTipo = false;
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  configurarGraficoPiePorCategoria() {
    this.dashboardService.estatisticasLancamentosPorCategoria(0)
      .then(dados => {
        this.pieChartLabels = dados.map(dado => dado.categoria.nome);
        this.pieChartData = dados.map(dado => dado.total);
        this.displayChartPieCategoria = false;
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
        } else {
          this.totaisDespesas = [];
          this.totaisReceitas = [];
        }
        this.displayChartDinamic = false;
      })
      .catch(erro => {
        console.log(erro);
      });
  }

}
