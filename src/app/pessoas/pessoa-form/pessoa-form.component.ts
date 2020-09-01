import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Pessoa, Endereco, Contato } from 'src/app/core/model';
import { ApoioService } from 'src/app/util/apoio.service';
import { NgForm } from '@angular/forms';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoasService } from '../pessoas.service';
import { ConfirmationService } from 'primeng/api';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent implements OnInit {

  @Input() display: boolean;
  @Output() eventDisplay = new EventEmitter<boolean>();
  @Output() retornoPersistencia = new EventEmitter<Pessoa>();
  @Input() pessoa: Pessoa;
  displaySpinner: boolean = false;
  situacoes = [
    { label: 'Ativo', value: 'ATIVO' },
    { label: 'Inativo', value: 'INATIVO' }
  ];
  usuarios: any[] = [];
  
  constructor(
    private apoioService: ApoioService,
    private pessoaService: PessoasService,
    private toastyService: ToastService,
    private confirmationService: ConfirmationService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.carregarListaUsuarios();
  }
  
  confirmarEdicao(form: NgForm){
    this.confirmationService.confirm({message: 'Tem certeza que deseja editar pessoa?',
    accept: ()=>{
       this.alterar(form);
    }});
  }

  cancelar(form: NgForm){
    if(this.pessoa.id === 0){
      this.carregarListaUsuarios();
    }
    this.novo(form);
    this.retornoPersistencia.emit(null);
    this.eventDisplay.emit(false);
  }

  novo(form: NgForm){
    form.resetForm();
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);
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

  gerenciarPersistencia(form: NgForm){
    if(this.pessoa.id > 0){
      this.confirmarEdicao(form);
    }else{
      this.salvar(form);
    }
  }

  salvar(form: NgForm){
    this.displaySpinner = true;
    this.pessoaService.salvar(this.pessoa)
    .then(response=>{
      this.novo(form);
      this.retornoPersistencia.emit(response);
      this.eventDisplay.emit(false);
      this.carregarListaUsuarios();
      this.toastyService.showSuccess("Pessoa adicionada com sucesso!");
      this.displaySpinner = false;
    })
    .catch(erro=>{
      this.retornoPersistencia.emit(null);
      console.log(erro);
      this.toastyService.showError("Erro ao adicionar pessoa!");
      this.displaySpinner = false;
    });
  }

  alterar(form: NgForm){
    this.displaySpinner = true;
    this.pessoaService.editar(this.pessoa)
    .then(response=>{
      this.novo(form);
      this.retornoPersistencia.emit(response);
      this.eventDisplay.emit(false);
      this.toastyService.showSuccess("Pessoa editada com sucesso!");
      this.displaySpinner = false;
    })
    .catch(erro=>{
      this.retornoPersistencia.emit(null);
      console.log(erro);
      this.toastyService.showError("Erro ao editar pessoa!");
      this.displaySpinner = false;
    });
  }

  carregarListaUsuariosDisponiveis(){
    this.usuarios = [];
    this.usuariosService.listarDisponiveis()
    .then(response =>{
      if(response.length>0){
        this.usuarios = response;
      }
    })
    .catch(error =>{
      console.log(error);
    });
  }

  carregarListaUsuarios(){
    this.usuarios = [];
    this.usuariosService.listar()
    .then(response =>{
      if(response.length>0){
        this.usuarios = response;
      }
    })
    .catch(error =>{
      console.log(error);
    });
  }

} 