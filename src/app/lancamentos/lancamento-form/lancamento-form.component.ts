import { Component, OnInit, Input } from '@angular/core';
import { Lancamento } from 'src/app/core/model';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'src/app/util/categoria.service';
import { LancamentosService } from '../lancamentos.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { PessoasService } from 'src/app/pessoas/pessoas.service';
import { ApoioService } from 'src/app/util/apoio.service';

@Component({
  selector: 'app-lancamento-form',
  templateUrl: './lancamento-form.component.html',
  styleUrls: ['./lancamento-form.component.css']
})
export class LancamentoFormComponent implements OnInit {

  @Input() lancamento : Lancamento;
  displaySpinner: boolean = false;
  display: boolean = false;
  pessoas: any[] = [];
  categorias: any[] = [];
  tipos = [ 
    {label:'Receita', value: 'RECEITA'},
    {label:'Despesa', value: 'DESPESA'},
  ];
  ptBr: any;
  uploadEmAndamento = false;

  constructor(
    private lancamentosService: LancamentosService,
    private categoriaService: CategoriaService,
    private pessoasService: PessoasService,
    private toastyService: ToastService,
    private router: Router,
    public apoioService: ApoioService,
  ) {
    this.ptBr = apoioService.getCalendarioPtBr();
  }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  antesUploadAnexo(event) {
    this.displaySpinner = true;
  }

  aoTerminarUploadAnexo(event) {
    const anexo = event.originalEvent.body;
    this.lancamento.anexo = anexo.nome;
    this.lancamento.urlAnexo = 'https:'+anexo.url;
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

  get editando(){
    return Boolean(this.lancamento.id);
  }

  novo(f: NgForm){
    f.resetForm();
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);
    this.router.navigate['/lancamentos/cadastro'];
  }

  salvar(){
    this.displaySpinner = true;
    this.lancamentosService.salvar(this.lancamento)
    .then(response=>{
      this.toastyService.showSuccess("Lançamento adicionado com sucesso!");
      this.displaySpinner = false;
    })  
    .catch(erro => {
      console.log(erro);
      this.toastyService.showError("Erro ao adicionar lançamento!");
      this.displaySpinner = false;
    });
  }

  editar(){
    this.displaySpinner = true;
    this.lancamentosService.editar(this.lancamento)
    .then(response =>{
      this.toastyService.showSuccess("Lancaçamento editado com sucesso!");
      this.displaySpinner = false;
    })
    .catch(erro =>{
      console.log(erro);
      this.toastyService.showError("Erro ao editar lançamento!");
      this.displaySpinner = false;
    });
  }

  gerenciarPersistencia(f: NgForm){
    if(this.lancamento.id > 0){
      this.editar();
    }else{
      this.salvar();
    }
  }

  buscarPorId(id: number){
    this.displaySpinner = true;
    this.lancamentosService.buscarPorId(id)
    .then(response =>{
      if(response != null){
        this.lancamento = response;
        this.lancamento.dataVencimento = moment(this.lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
        if(this.lancamento.dataPagamento != null){
          this.lancamento.dataPagamento = moment(this.lancamento.dataPagamento, 'YYYY-MM-DD').toDate()
        }
      }
      this.displaySpinner = false;
    })
    .catch(erro =>{
      console.log(erro);
      this.displaySpinner = false;
    });
  }

  carregarPessoas(){
    this.pessoas = [];
    this.pessoasService.listar()
    .then(retorno =>{
      if(retorno.length > 0){
        this.pessoas = retorno;
      }
    })
    .catch(erro => {
      console.log(erro);
    });
  }

  carregarCategorias(){
    this.categorias = [];
    this.categoriaService.listar()
    .then(retorno =>{
      if(retorno.length > 0){
        this.categorias = retorno;
      }
    })
    .catch(erro => {
      console.log(erro);
    });
  }
}
