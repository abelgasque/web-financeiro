import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { LancamentoFilter, Lancamento, Pessoa } from 'src/app/core/model';
import { AuthService } from 'src/app/seguranca/auth.service';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'src/app/util/categoria.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ApoioService } from 'src/app/util/apoio.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { LancamentosService } from 'src/app/lancamentos/lancamentos.service';
import * as moment from 'moment';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-dashboard-crud-lancamentos',
  templateUrl: './dashboard-crud-lancamentos.component.html',
  styleUrls: ['./dashboard-crud-lancamentos.component.css']
})
export class DashboardCrudLancamentosComponent implements OnInit {


  @Input() pessoa = new Pessoa();
  @Output() retornoPersistencia = new EventEmitter<Boolean>();
  @ViewChild('tabela', {static: true}) table: Table;
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

  constructor(
    public auth: AuthService,
    private categoriaService: CategoriaService,
    private toastyService: ToastService,
    public apoioService: ApoioService,
    private confirmationService: ConfirmationService,
    private lancamentosService: LancamentosService
  ) {}

  ngOnInit(): void {
    this.ptBr = this.apoioService.getCalendarioPtBr();
    this.carregarCategorias();
    setTimeout(() => {
      console.log(this.pessoa);
      this.getTable(this.pessoa.id);
    }, 1000);
  }

  getTable(id:number) {
    if(id != undefined || id != null && id > 0){
      this.filtro.pessoa = id;
      this.lancamentosService.pesquisar(this.filtro)
        .then(response => {
          this.filtro.total = response.total;
          this.lancamentos = response.lancamentos;
          this.displaySpinner = false;
        })
        .catch(erro => {
          this.toastyService.showError("Erro ao pesquisar lançamentos!");
          this.displaySpinner = false;
        });
    }
  }

  aoMudarPagina(event: LazyLoadEvent) {
    this.filtro.pagina = event.first / event.rows;
    // this.getTable(this.pessoa.id);
  }

  resetForm(f: NgForm) {
    f.resetForm();
    setTimeout(function () {
      this.lancamento = new Lancamento();
    }.bind(this), 1);
  }

  novo(f: NgForm) {
    this.resetForm(f);
    this.display = true;
  }

  salvar(f: NgForm) {
    this.displaySpinner = true;
    this.lancamento.pessoa = this.pessoa;
    this.lancamentosService.salvar(this.lancamento)
      .then(response => {
        this.retornoPersistencia.emit(true);
        this.getTable(this.pessoa.id);
        this.display = false;
        this.resetForm(f);
        this.toastyService.showSuccess("Lançamento adicionado com sucesso!");
        this.displaySpinner = false;
      })
      .catch(erro => {
        console.log(erro);
        this.toastyService.showError("Erro ao adicionar lançamento!");
        this.displaySpinner = false;
      });
  }

  editar(f: NgForm) {
    this.displaySpinner = true;
    this.lancamento.pessoa = this.pessoa;
    this.lancamentosService.editar(this.lancamento)
      .then(response => {
        this.retornoPersistencia.emit(true);
        this.getTable(this.pessoa.id);
        this.display = false;
        this.resetForm(f);
        this.toastyService.showSuccess("Lancaçamento editado com sucesso!");
        this.displaySpinner = false;
      })
      .catch(erro => {
        console.log(erro);
        this.toastyService.showError("Erro ao editar lançamento!");
        this.displaySpinner = false;
      });
  }

  confirmarEdicao(form: NgForm) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja editar lançamento?',
      accept: () => {
        this.editar(form);
      }
    });
  }

  gerenciarPersistencia(f: NgForm) {
    if (this.lancamento.id > 0) {
      this.confirmarEdicao(f);
    } else {
      this.salvar(f);
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