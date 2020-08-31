import { Component, OnInit, Input } from '@angular/core';
import { Pessoa, Endereco, Contato } from 'src/app/core/model';
import { ApoioService } from 'src/app/util/apoio.service';
import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoasService } from '../pessoas.service';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent implements OnInit {

  @Input() pessoa: Pessoa;
  displayFormPessoa: boolean = true;
  displaySpinner: boolean = false;
  situacoes = [
    { label: 'Ativo', value: 'ATIVO' },
    { label: 'Inativo', value: 'INATIVO' }
  ];

  constructor(
    private apoioService: ApoioService,
    private pessoaService: PessoasService,
    private toastyService: ToastService
  ) { }

  ngOnInit(): void {}
  
  novo(form: NgForm){
    this.pessoa = new Pessoa();
    form.resetForm();
    this.displayFormPessoa = true;
  }

  getEnderecoPorCep(cep: string){
    this.displaySpinner = true;
    this.apoioService.getEnderecoPorCep(cep)
    .then(response=>{
      if(response != null){
        this.pessoa.endereco.uf = response.uf;
        this.pessoa.endereco.cidade = response.localidade;
        this.pessoa.endereco.bairro = response.bairro;
        this.pessoa.endereco.logradouro = response.logradouro;
      }
      this.displaySpinner = false;
    })
    .catch(erro=>{
      console.log(erro);
      this.displaySpinner = false;
    });
  }

  gerenciarPersistencia(){
    if(this.pessoa.id > 0){
      this.alterar();
    }else{
      this.salvar();
    }
  }

  salvar(){
    this.displaySpinner = true;
    this.pessoaService.salvar(this.pessoa)
    .then(response=>{
      this.toastyService.showSuccess("Pessoa adicionada com sucesso!");
      this.displaySpinner = false;
    })
    .catch(erro=>{
      console.log(erro);
      this.toastyService.showError("Erro ao adicionar pessoa!");
      this.displaySpinner = false;
    });
  }

  alterar(){
    this.displaySpinner = true;
    this.pessoaService.editar(this.pessoa)
    .then(response=>{
      this.toastyService.showSuccess("Pessoa editada com sucesso!");
      this.displaySpinner = false;
    })
    .catch(erro=>{
      console.log(erro);
      this.toastyService.showError("Erro ao editar pessoa!");
      this.displaySpinner = false;
    });
  }
} 