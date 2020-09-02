import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/model';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {

  usuario: Usuario;
  displaySpinner: boolean = false;

  constructor(
    private usuariosService: UsuariosService,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  login(username:string, password: string){
    this.authService.login(username, password)
    .then(response => {
      this.router.navigate(['']);
    })
    .catch(response => {
      console.log(response);
      this.toastService.showError("Erro ao autenticar usuário");
    });
  }

  adicionar(){
    this.displaySpinner = true;
    if(this.validarUsuario() === true){
      this.usuario.permissoes = [
        { id: 2, descricao: 'ROLE_PESSOA'}
      ];
      this.usuario.situacao = 'INATIVO';
      this.usuariosService.salvar(this.usuario)
        .then(response => {
          this.router.navigate(['/seguranca', 'login-autenticacao']);
          this.usuario = new Usuario();
          this.toastService.showSuccess("Usuário adicionado com sucesso!");
          this.displaySpinner = false;
        })
        .catch(error => {
          console.log(error);
          if(error.status == 409){
            this.toastService.showWarn(error.error.message);
          }else{
            this.toastService.showError("Erro ao adicionar usuário");
          }
          this.displaySpinner = false;
        });
    }
  }

  validarUsuario(){
    if(this.usuario.nome == undefined || this.usuario.nome == '' || this.usuario.nome == null){
      this.toastService.showWarn("Insira um nome até 30 caracteres");
      return false;
    } else  if(this.usuario.email == undefined || this.usuario.email == '' || this.usuario.email == null){
      this.toastService.showWarn("Insira um e-mail até 50 caracteres");
      return false;
    }else if(this.usuario.senha == undefined || this.usuario.senha == '' || this.usuario.senha == null){
      this.toastService.showWarn("Insira uma senha entre 6 a 12 caracteres");
      return false;
    }else{
      return true;
    }
  }
}
