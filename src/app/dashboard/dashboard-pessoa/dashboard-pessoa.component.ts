import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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
      backgroundColor: ['rgba(118,180,250)', 'rgba(250, 107, 107)'],
    },
  ];

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

  saldo: number = 0.0;
  rendimentos: number = 0.0;
  receitas: number = 0.0;
  despesas: number = 0.0;
  displaySpinner: boolean = false;
  pessoa: Pessoa;
  ano: number = 2020;

  constructor(
    private dashboardService: DashboardService,
    public auth: AuthService,
    private pessoasService: PessoasService,
    private toastyService: ToastService,
    public apoioService: ApoioService,
    private usuarioService: UsuariosService,
    private handler: ErrorHandlerService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.getComponente();
  }

  getComponente() {
    this.usuarioService.buscarPorEmail(this.auth.jwtPayload.user_name)
      .then(usuario => {
        this.buscarPessoaPorUsuarioById(usuario.id);
      })
      .catch(error => { this.handler.handle(error) });
  }

  retornoCrudLancamento(retorno: boolean) {
    if (retorno == true) {
      location.reload();
    }
  }

  configurarCharts(pessoa: Pessoa) {
    if (pessoa != null) {
      this.configurarGraficoPizzaAndCards(pessoa.id);
      this.confirgurarGraficoDinamic(this.ano, pessoa.id);
    } else {
      this.toastyService.showWarn("Pessoa não encontrada no sistema");
      this.router.navigate(['']);
    }
  }

  buscarPessoaPorUsuarioById(id: number) {
    this.pessoasService.buscarPorUsuarioId(id)
      .then(pessoa => {
        if (pessoa != null) {
          this.pessoa = pessoa;
          this.configurarCharts(pessoa);
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
          this.saldo = (this.receitas - this.despesas);
        }
      })
      .catch(erro => {
        console.log(erro);
      });
  }

  confirgurarGraficoDinamic(ano: number, idPessoa: number) {
    this.dashboardService.estatisticasLancamentosPorMes(ano, idPessoa)
      .then(response => {
        console.log(response);
        let receitas = response.filter(dado => dado.tipo === 'RECEITA');
        let despesas = response.filter(dado => dado.tipo === 'DESPESA');
        for (let i = 0; i < 12; i++) {
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
