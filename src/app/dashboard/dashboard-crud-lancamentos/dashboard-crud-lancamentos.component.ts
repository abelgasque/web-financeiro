import { Component, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { LancamentoFilter, Lancamento } from 'src/app/core/model';
import { AuthService } from 'src/app/seguranca/auth.service';
import { CategoriaService } from 'src/app/util/categoria.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ApoioService } from 'src/app/util/apoio.service';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { LancamentosService } from 'src/app/lancamentos/lancamentos.service';
import * as moment from 'moment';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-dashboard-crud-lancamentos',
  templateUrl: './dashboard-crud-lancamentos.component.html',
  styleUrls: ['./dashboard-crud-lancamentos.component.css']
})
export class DashboardCrudLancamentosComponent implements AfterViewInit {

  @Output() retornoPersistencia = new EventEmitter<Boolean>();
  @ViewChild('tabela', { static: true }) table: Table;
  lancamentos: any[] = [];
  display: boolean = false;
  lancamento = new Lancamento();
  categorias: any[] = [];
  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];
  ptBr: any;
  filtro = new LancamentoFilter();
  displaySpinner: boolean = false;
  items: MenuItem[];
  aux: number = 0;
  idPessoa: number;

  constructor(
    public auth: AuthService,
    private categoriaService: CategoriaService,
    private toastyService: ToastService,
    public apoioService: ApoioService,
    private confirmationService: ConfirmationService,
    private lancamentosService: LancamentosService
  ) {
    this.ptBr = this.apoioService.getCalendarioPtBr();
    this.carregarCategorias();
    this.items = [
      {
        label: 'Novo', icon: 'pi pi-plus', command: () => {
          this.novo();
        }
      },
    ];
  }

  ngAfterViewInit(): void {
    this.idPessoa = +this.apoioService.getIdPessoaStorage();
    if ( this.idPessoa != undefined ||  this.idPessoa != null &&  this.idPessoa > 0) {
      this.pesquisar();
    }
  }

  pesquisar() {
    this.lancamentos = [];
    this.filtro.pessoa =  this.idPessoa;
    this.lancamentosService.pesquisar(this.filtro)
      .then(response => {
        this.filtro.total = response.total;
        this.lancamentos = response.lancamentos;
      })
      .catch(erro => {
        this.toastyService.showError("Erro ao pesquisar lançamentos!");
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    this.filtro.pagina = event.first / event.rows;
    this.pesquisar();
  }

  novo() {
    this.lancamento = new Lancamento();
    this.aux = 0;
    this.display = true;
  }

  cancelar() {
    if (this.aux > 0) {
      this.retornoPersistencia.emit(true);
    }
    this.display = false;
  }

  salvar() {
    this.displaySpinner = true;
    this.lancamento.pessoa.id =  this.idPessoa;
    this.lancamentosService.salvar(this.lancamento)
      .then(response => {
        this.pesquisar();
        this.aux++;
        this.lancamento = new Lancamento();
        this.toastyService.showSuccess("Lançamento adicionado com sucesso!");
        this.displaySpinner = false;
      })
      .catch(erro => {
        console.log(erro);
        this.toastyService.showError("Erro ao adicionar lançamento!");
        this.displaySpinner = false;
      });
  }

  editar() {
    this.displaySpinner = true;
    this.lancamento.pessoa.id =  this.idPessoa;
    this.lancamentosService.editar(this.lancamento)
      .then(response => {
        this.pesquisar();
        this.display = false;
        this.lancamento = new Lancamento();
        this.toastyService.showSuccess("Lancaçamento editado com sucesso!");
        this.retornoPersistencia.emit(true);
        this.displaySpinner = false;
      })
      .catch(erro => {
        console.log(erro);
        this.toastyService.showError("Erro ao editar lançamento!");
        this.displaySpinner = false;
      });
  }

  confirmarEdicao() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja editar lançamento?',
      accept: () => {
        this.editar();
      }
    });
  }

  gerenciarPersistencia() {
    if (this.lancamento.id > 0) {
      this.confirmarEdicao();
    } else {
      this.salvar();
    }
  }

  buscarPorId(id: number) {
    this.displaySpinner = true;
    this.lancamento = new Lancamento();
    this.lancamentosService.buscarPorId(id)
      .then(response => {
        if (response != null) {
          this.lancamento = response;
          this.lancamento.dataVencimento = moment(this.lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
          if (this.lancamento.dataPagamento != null) {
            this.lancamento.dataPagamento = moment(this.lancamento.dataPagamento, 'YYYY-MM-DD').toDate()
          }
        }
        this.display = true;
        this.displaySpinner = false;
      })
      .catch(erro => {
        console.log(erro);
        this.displaySpinner = false;
      });
  }

  //upload
  antesUploadAnexo(event) {
    this.displaySpinner = true;
  }

  aoTerminarUploadAnexo(event) {
    const anexo = event.originalEvent.body;
    this.lancamento.anexo = anexo.nome;
    this.lancamento.urlAnexo = 'https:' + anexo.url;
    this.displaySpinner = false;
  }

  erroUpload(event) {
    this.toastyService.showError("Erro ao tentar enviar anexo!");
    console.log(event);
    this.displaySpinner = false;
  }

  removerAnexo() {
    this.lancamento.anexo = null;
    this.lancamento.urlAnexo = null;
  }

  get nomeAnexo() {
    const nome = this.lancamento.anexo;
    if (nome != null) {
      return nome.substring(nome.indexOf('_') + 1, nome.length);
    }
    return '';
  }

  get urlUploadAnexo() {
    return this.lancamentosService.urlUploadAnexo();
  }

  get editando() {
    return Boolean(this.lancamento.id);
  }

  carregarCategorias() {
    this.categorias = [];
    this.categoriaService.listar()
      .then(retorno => {
        if (retorno.length > 0) {
          this.categorias = retorno;
        }
      })
      .catch(erro => {
        console.log(erro);
      });
  }
}
