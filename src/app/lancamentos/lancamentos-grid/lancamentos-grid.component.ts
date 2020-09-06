import { Component, Input, Output, AfterViewInit, EventEmitter, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService, MenuItem } from 'primeng/api';
import * as moment from 'moment';
import { LancamentoFilter, Lancamento } from 'src/app/core/model';
import { LancamentosService } from '../lancamentos.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent implements OnInit {

  @Input() filtro: LancamentoFilter = new LancamentoFilter();
  @Output() retornoPersistencia = new EventEmitter<any>();
  lancamentos: any[] = [];
  displaySpinner: boolean = false;
  displayFormLancamento: boolean = false;
  lancamentoForm = new Lancamento();
  items: MenuItem[];

  constructor(
    private lancamentosService: LancamentosService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Novo', icon: 'pi pi-plus', command: () => {
          this.novoLancamento();
        }
      },
    ];
  }

  getEventFormLancamento(lancamento: Lancamento) {
    if (lancamento != null) {
      this.pesquisar();
    }
  }

  formatarDataTabela(data: string) {
    return moment(data).format("DD/MM/YYYY");
  }

  novoLancamento() {
    this.lancamentoForm = new Lancamento();
    this.displayFormLancamento = true;
  }

  aoMudarPagina(event: LazyLoadEvent) {
    this.filtro.pagina = event.first / event.rows;
    this.pesquisar();
  }

  pesquisar() {
    this.displaySpinner = true;
    this.lancamentosService.pesquisar(this.filtro)
      .then(response => {
        this.retornoPersistencia.emit(response);
        this.filtro.total = response.total;
        this.lancamentos = response.lancamentos;
        this.displaySpinner = false;
      })
      .catch(erro => {
        this.toastService.showError("Erro ao pesquisar lançamentos!");
        this.displaySpinner = false;
      });
  }

  buscarPorId(id: number) {
    this.displaySpinner = true;
    this.lancamentosService.buscarPorId(id)
      .then(response => {
        if (response != null) {
          response.dataVencimento = moment(response.dataVencimento, 'YYYY-MM-DD').toDate();
          if (response.dataPagamento != null) {
            response.dataPagamento = moment(response.dataPagamento, 'YYYY-MM-DD').toDate();
          }
          this.lancamentoForm = response;
          console.log(this.lancamentoForm);
        }
        this.displaySpinner = false;
      })
      .catch(erro => {
        console.log(erro);
        this.displaySpinner = false;
      });
  }

  getLancamento(id: number) {
    this.lancamentoForm = new Lancamento();
    this.buscarPorId(id);
    this.displayFormLancamento = !this.displayFormLancamento;
  }

  confirmarExclusao(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir lançamento?',
      accept: () => {
        this.excluir(id);
      }
    });
  }

  excluir(id: number) {
    this.displaySpinner = true;
    this.lancamentosService.excluir(id)
      .then(retorno => {
        this.toastService.showSuccess("Lançamento excluido com sucesso!");
        this.pesquisar();
      })
      .catch(erro => {
        this.toastService.showError("Erro ao excluir lançamento!");
        this.displaySpinner = false;
      });
  }
}
