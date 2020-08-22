import { Component, OnInit, Input } from '@angular/core';
import { Lancamento } from 'src/app/core/model';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'src/app/util/categoria.service';
import { LancamentosService } from '../lancamentos.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { PessoasService } from 'src/app/pessoas/pessoas.service';

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

  constructor(
    private lancamentosService: LancamentosService,
    private categoriaService: CategoriaService,
    private pessoasService: PessoasService,
    private toastyService: ToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
    const idLancamento = this.route.snapshot.params['id'];
    if(idLancamento){
      this.buscarPorId(idLancamento);
    }
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
      this.router.navigate(['/lancamentos']);
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
      this.router.navigate(['/lancamentos']);
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
      this,this.salvar();
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
