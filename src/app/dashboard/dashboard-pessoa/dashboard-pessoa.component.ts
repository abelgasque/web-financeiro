import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { Pessoa } from 'src/app/core/model';
import { AuthService } from 'src/app/seguranca/auth.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ApoioService } from 'src/app/util/apoio.service';

@Component({
  selector: 'app-dashboard-pessoa',
  templateUrl: './dashboard-pessoa.component.html',
  styleUrls: ['./dashboard-pessoa.component.css']
})
export class DashboardPessoaComponent implements OnInit {

  displayChartDinamic: boolean = true;
  displayChartPieCategoria: boolean = true;
  displayChartPieTipo: boolean = true;
  displayCards: boolean = true;
  displayCrudLancamentos: boolean = true;
  displaySpinner: boolean = false;

  receitasPieCategoria: any[] = [];
  despesasPieCategoria: any[] = [];
  receitasPieTipo: number = 0.0;
  despesasPieTipo: number = 0.0;
  saldoCard: number = 0.0;
  rendimentosCard: number = 0.0;
  receitasCard: number = 0.0;
  despesasCard: number = 0.0;
  ano: number = new Date().getUTCFullYear();

  pieChartData: any[] = [];
  pieChartLabels: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    public auth: AuthService,
    private toastyService: ToastService,
    public apoioService: ApoioService,
    private router: Router
  ) { }

  ngOnInit() {
    let retorno = this.apoioService.getIdPessoaStorage();
    const idPessoa: number = +retorno;
    if (idPessoa != null && idPessoa != undefined && idPessoa > 0) {
      this.configurarCharts(idPessoa);
      this.displayCrudLancamentos = false;
    } else {
      this.router.navigate(['']);
      this.toastyService.showWarn("Pessoa não encontrada no sistema");
    }
  }

  retornoCrudLancamento(retorno: boolean) {
    if (retorno == true) {
      location.reload();
    }
  }

  configurarCharts(id: number) {
    this.configurarGraficoPizzaAndCards(id);
    this.confirgurarGraficoDinamic(this.ano, id);
    this.configurarGraficoPiePorCategoria(id);
  }

  configurarGraficoPiePorCategoria(id: number) {
    this.dashboardService.estatisticasLancamentosPorCategoria(id)
      .then(dados => {
        this.pieChartLabels = dados.map(dado => dado.categoria.nome);
        this.pieChartData = dados.map(dado => dado.total);
        this.displayChartPieCategoria = false;
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  configurarGraficoPizzaAndCards(id: number) {
    this.dashboardService.estatisticasLencamentosPorPessoaById(id)
      .then(dados => {
        if (dados.length > 0) {
          for (let i = 0; i < dados.length; i++) {
            if (dados[i].tipo == "RECEITA" && dados[i].total > 0) {
              this.receitasCard += dados[i].total;
            }
            if (dados[i].tipo == "DESPESA" && dados[i].total > 0) {
              this.despesasCard += dados[i].total;
            }
          }
          this.saldoCard = (this.receitasCard - this.despesasCard);
        }
        this.displayChartPieCategoria = false;
        this.displayCards = false;
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  confirgurarGraficoDinamic(ano: number, idPessoa: number) {
    this.dashboardService.estatisticasLancamentosPorMes(ano, idPessoa)
      .then(response => {
        if (response.length > 0) {
          let data = new Date();
          for (let i = 0; i < response.length; i++) {
            if (response[i].tipo == "RECEITA") {
              this.receitasPieCategoria.push(response[i].total);
            } else {
              this.despesasPieCategoria.push(response[i].total);
            }
            if (data.getMonth() + 1 == response[i].mes) {
              if (response[i].tipo == "RECEITA" && response[i].total > 0) {
                this.receitasPieTipo += response[i].total;
              } else {
                this.despesasPieTipo += response[i].total;
              }
            }
          }
        }
        this.displayChartPieTipo = false;
        this.displayChartDinamic = false;
      })
      .catch(erro => {
        console.log(erro);
      });
  }
}
