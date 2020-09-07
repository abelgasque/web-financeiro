import { Component, OnInit } from '@angular/core';
import { Pessoa, Endereco } from 'src/app/core/model';
import { NgForm } from '@angular/forms';
import { PessoasService } from 'src/app/pessoas/pessoas.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ApoioService } from 'src/app/util/apoio.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-seguranca-pessoa-form',
  templateUrl: './seguranca-pessoa-form.component.html',
  styleUrls: ['./seguranca-pessoa-form.component.css']
})
export class SegurancaPessoaFormComponent implements OnInit {

  pessoa = new Pessoa();
  displaySpinner: boolean = false;
  confirmarSenha: string = '';

  constructor(
    private pessoaService: PessoasService,
    private toastService: ToastService,
    private apoioService: ApoioService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let retorno = this.apoioService.getIdPessoaStorage();
    const idPessoa: number = +retorno;
    if (idPessoa) {
      this.buscarPorId(idPessoa);
    }
  }

  buscarPorId(id: number) {
    this.displaySpinner = true;
    this.pessoaService.buscarPorId(id)
      .then(response => {
        if (response != null) {
          if (response.endereco == null) {
            response.endereco = new Endereco();
          }
          response.usuario.senha = null;
          this.pessoa = response;
        }
        this.displaySpinner = false;
      })
      .catch(erro => {
        console.log(erro);
        this.toastService.showError("Erro ao buscar pessoa!");
        this.displaySpinner = false;
      });
  }

  getEnderecoPorCep(cep: string) {
    this.displaySpinner = true;
    this.apoioService.getEnderecoPorCep(cep)
      .then(response => {
        if (response != null) {
          this.pessoa.endereco.uf = response.uf;
          this.pessoa.endereco.cidade = response.localidade;
          this.pessoa.endereco.bairro = response.bairro;
          this.pessoa.endereco.logradouro = response.logradouro;
        }
        this.displaySpinner = false;
      })
      .catch(erro => {
        console.log(erro);
        this.displaySpinner = false;
      });
  }

  cancelar() {
    this.pessoa = new Pessoa();
    this.confirmarSenha = '';
  }

  adicionar() {
    if (this.pessoa.usuario.senha != this.confirmarSenha) {
      this.toastService.showWarn("Senha e confirma senha devem ser iguais!");
    } else {
      this.displaySpinner = true;
      this.pessoa.usuario.permissoes = [
        { id: 2, descricao: 'ROLE_PESSOA' }
      ];
      this.pessoa.usuario.situacao = 'INATIVO';
      this.pessoa.usuario.nome = this.pessoa.nome;
      this.pessoaService.salvar(this.pessoa)
        .then(response => {
          this.cancelar();
          this.router.navigate(['/seguranca', 'login-autenticacao']);
          this.toastService.showSuccess("Pessoa adicionada com sucesso!");
          this.displaySpinner = false;
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

  edicao() {
    this.displaySpinner = true;
    this.pessoaService.editar(this.pessoa)
      .then(response => {
        this.toastService.showSuccess("Pessoa editada com sucesso!");
        this.displaySpinner = false;
      })
      .catch(error => {
        console.log(error);
        if (error.status == 409) {
          this.toastService.showWarn(error.error.message);
        } else {
          this.toastService.showError("Erro ao editar pessoa");
        }
        this.displaySpinner = false;
      });
  }

  confirmarEdicao() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir lançamento?',
      accept: () => {
        this.edicao();
      }
    });
  }

  gerenciarPersistencia(form: NgForm) {
    if (this.pessoa.id > 0) {
      this.confirmarEdicao();
    } else {
      this.adicionar();
    }
  }
}
