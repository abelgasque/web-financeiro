import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Usuario, Pessoa } from 'src/app/core/model';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PessoasService } from 'src/app/pessoas/pessoas.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  @Output() retornoPersistencia = new EventEmitter<Boolean>();
  pessoa = new Pessoa();
  displaySpinner: boolean = false;

  constructor(
    private pessoaService: PessoasService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void { }

  cancelar() {
    this.pessoa = new Pessoa();
    this.pessoa.contatos = [];
    this.retornoPersistencia.emit(false);
  }

  adicionar() {
    if (this.validar() === true) {
      this.displaySpinner = true;
      this.pessoa.usuario.permissoes = [
        { id: 2, descricao: 'ROLE_PESSOA' }
      ];
      this.pessoa.usuario.situacao = 'INATIVO';
      this.pessoa.nome = this.pessoa.usuario.nome;
      console.log(this.pessoa);
      this.pessoaService.salvar(this.pessoa)
        .then(response => {
          this.cancelar();
          this.toastService.showSuccess("Pessoa adicionada com sucesso!");
        })
        .catch(error => {
          console.log(error);
          if (error.status == 409) {
            this.toastService.showWarn(error.error.message);
          } else {
            this.toastService.showError("Erro ao adicionar pessoa");
          }
          this.displaySpinner = false;
        });
    }
  }

  validar() {
    if (this.pessoa.usuario.nome == undefined || this.pessoa.usuario.nome == ''
      || this.pessoa.usuario.nome == null) {
      this.toastService.showWarn("Insira um nome até 30 caracteres");
      return false;
    } else if (this.pessoa.cpf == undefined || this.pessoa.cpf == ''
      || this.pessoa.cpf == null) {
      this.toastService.showWarn("Insira um CPF");
      return false;
    } else if (this.pessoa.usuario.email == undefined || this.pessoa.usuario.email == ''
      || this.pessoa.usuario.email == null) {
      this.toastService.showWarn("Insira um e-mail até 50 caracteres");
      return false;
    } else if (this.pessoa.usuario.senha == undefined || this.pessoa.usuario.senha == ''
      || this.pessoa.usuario.senha == null) {
      this.toastService.showWarn("Insira uma senha entre 6 a 12 caracteres");
      return false;
    } else {
      return true;
    }
  }
}
