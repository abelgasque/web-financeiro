import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/model';
import { AuthService } from '../auth.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import { ApoioService } from 'src/app/util/apoio.service';
import { PessoasService } from 'src/app/pessoas/pessoas.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  usuario = new Usuario();
  displaySpinner: boolean = false;
  display: boolean = false;

  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private usuarioService: UsuariosService,
    private toastService: ToastService,
    private apoioService: ApoioService,
    private pessoasService: PessoasService
  ) { }

  ngOnInit(): void {
    this.authService.limparAccessToken();
    this.apoioService.limparIdUsuarioStorage();
    this.apoioService.limparIdPessoaStorage();
  }


  gerenciarRedirect() {
    if (this.authService.jwtPayload.authorities.length == 2) {
      this.router.navigate(['/dashboard', 'pessoa']);
    } else if (this.authService.jwtPayload.authorities.length == 1) {
      if (this.authService.jwtPayload.authorities[0] === 'ROLE_PESSOA') {
        this.router.navigate(['/dashboard', 'pessoa']);
      } else {
        this.router.navigate(['/dashboard', 'admin']);
      }
    }
  }

  buscarIdPessoaByIdUsuario(id: number) {
    this.pessoasService.buscarPorUsuarioId(id)
      .then(response => {
        if (response != null) {
          this.apoioService.armazenarIdPessoaStorage(response.id);
        }
        this.gerenciarRedirect();
      })
      .catch(error => {
        this.errorHandler.handle(error);
      });
  }

  buscarIdUsuarioByEmail() {
    this.displaySpinner = true;
    this.usuarioService.buscarPorEmail(this.authService.jwtPayload.user_name)
      .then(usuario => {
        this.apoioService.armazenarIdUsuarioStorage(usuario.id);
        this.buscarIdPessoaByIdUsuario(usuario.id)
        this.displaySpinner = false;
      })
      .catch(error => {
        console.log(error);
        this.errorHandler.handle(error);
        this.displaySpinner = false;
      });
  }

  autenticarLogin() {
    this.displaySpinner = true;
    this.authService.login(this.usuario.email, this.usuario.senha)
      .then(response => {
        this.buscarIdUsuarioByEmail();
        this.displaySpinner = false;
      })
      .catch(erro => {
        console.log(erro);
        this.errorHandler.handle(erro);
        this.displaySpinner = false;
      });
  }

  validar() {
    this.displaySpinner = true;
    this.usuarioService.validarAutenticacao(this.usuario.email)
      .then(response => {
        this.displaySpinner = false;
        if (response == true) {
          this.autenticarLogin();
        } else {
          this.toastService.showWarn("Usuário inativo entre contato com administrador sistema");
        }
      })
      .catch(response => {
        console.log(response);
        this.errorHandler.handle(response);
        this.displaySpinner = false;
      });
  }
}
