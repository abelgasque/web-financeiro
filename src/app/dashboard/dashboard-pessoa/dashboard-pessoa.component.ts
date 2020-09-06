import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { DashboardService } from '../dashboard.service';
import { Label } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Pessoa } from 'src/app/core/model';
import { AuthService } from 'src/app/seguranca/auth.service';
import { PessoasService } from 'src/app/pessoas/pessoas.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ApoioService } from 'src/app/util/apoio.service';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';


@Component({
  selector: 'app-dashboard-pessoa',
  templateUrl: './dashboard-pessoa.component.html',
  styleUrls: ['./dashboard-pessoa.component.css']
})
export class DashboardPessoaComponent implements OnInit {

  displayChartDinamic: boolean = true;
  displayChartPieCategoria: boolean = true;
  displayChartPieTipoAndCards: boolean = true;
  displayCrudLancamentos: boolean = true;

  totaisReceitas: any[] = [];
  totaisDespesas: any[] = [];

  saldo: number = 0.0;
  rendimentos: number = 0.0;
  receitas: number = 0.0;
  despesas: number = 0.0;
  displaySpinner: boolean = false;
  pessoa: Pessoa;
  ano: number = 2020;

  pieChartData: any[] = [];
  pieChartLabels: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    public auth: AuthService,
    private pessoasService: PessoasService,
    private toastyService: ToastService,
    public apoioService: ApoioService,
    private usuarioService: UsuariosService,
    private handler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    let retorno = this.apoioService.getIdUsuarioStorage();
    const idUsuario: number = +retorno;
    if (idUsuario != null && idUsuario != undefined && idUsuario > 0) {
      this.buscarPessoaPorUsuarioById(idUsuario);
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

  buscarPessoaPorUsuarioById(id: number) {
    this.pessoasService.buscarPorUsuarioId(id)
      .then(response => {
        if (response != null) {
          this.configurarCharts(response.id);
          this.pessoa = response;
          this.displayCrudLancamentos = false;
        }
      })
      .catch(error => {
        if (error.status === 404) {
          this.toastyService.showWarn("Pessoa não encontrada no sistema");
          this.router.navigate(['']);
        } else {
          this.handler.handle(error);
        }
      });
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
          console.log(dados);
          for (let i = 0; i < dados.length; i++) {
            if (dados[i].tipo == "RECEITA" && dados[i].total > 0) {
              this.receitas = dados[i].total;
            }
            if (dados[i].tipo == "DESPESA" && dados[i].total > 0) {
              this.despesas = dados[i].total;
            }
          }
          this.saldo = (this.receitas - this.despesas);
        }
        this.displayChartPieCategoria = false;
        this.displayChartPieTipoAndCards = false;
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  confirgurarGraficoDinamic(ano: number, idPessoa: number) {
    this.dashboardService.estatisticasLancamentosPorMes(ano, idPessoa)
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
