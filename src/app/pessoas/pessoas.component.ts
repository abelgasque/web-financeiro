import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { PessoaFilter, Pessoa, Endereco } from 'src/app/core/model';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/seguranca/auth.service';
import { PessoasService } from './pessoas.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {
  
  @ViewChild('tabela', {static: true}) table: Table;
  filtro = new PessoaFilter();
  pessoas: any[] = [];
  displaySpinner: boolean = false;
  displayFormPessoa: boolean = false;
  pessoaForm = new Pessoa();

  constructor(
    private confirmationService: ConfirmationService,
    private pessoaService: PessoasService,
    private toastService: ToastService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.pesquisar();
  }
  
  getEventFormPessoa(pessoa: Pessoa){
    if(pessoa != null){
      this.pesquisar();
    }
  }

  novaPessoa(){
    this.pessoaForm = new Pessoa();
    this.displayFormPessoa = true;
  }

  aoMudarPagina(event: LazyLoadEvent){
    this.filtro.pagina = event.first/event.rows;
    this.pesquisar();
  }
  
  pesquisar(){
    this.displaySpinner = true;
    this.pessoaService.pesquisar(this.filtro)
    .then(response=>{
      this.filtro.total = response.total;
      this.pessoas = response.pessoas;
      this.displaySpinner = false;
    })
    .catch(erro=>{
      console.log(erro);
      this.toastService.showError("Erro ao pesquisar pessoas");
      this.displaySpinner = false;
    });
  }

  confirmarExclusao(id: number){
    this.confirmationService.confirm({message: 'Tem certeza que deseja excluir pessoa?',
    accept: ()=>{
       this.excluir(id);
    }});
  }

  excluir(id: number){
    this.displaySpinner = true;
    this.pessoaService.excluir(id)
    .then(retorno =>{
      this.toastService.showSuccess("Pessoa excluida com sucesso!");
      this.pesquisar();
    })
    .catch(erro =>{
      this.toastService.showError("Erro ao excluir pessoa!");
      this.displaySpinner = false;
    });
  }

  buscarPorId(id: number) {
    this.displaySpinner = true;
    this.pessoaForm = new Pessoa();
    this.pessoaService.buscarPorId(id)
    .then(response=>{
      if(response != null){
        if(response.endereco == null){
          response.endereco = new Endereco();
        }
        this.pessoaForm=response;
      }
      this.displaySpinner = false;
    })
    .catch(erro=>{
      console.log(erro);
      this.toastService.showError("Erro ao buscar pessoa!");
      this.displaySpinner = false;
    });
  }

  getPessoa(id: number){
    this.buscarPorId(id);
    this.displayFormPessoa = true;
  }
}

