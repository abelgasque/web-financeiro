import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/model';
import { AuthService } from '../auth.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  usuario = new Usuario();
  displaySpinner: boolean = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  autenticarLogin(){
    this.displaySpinner = true;
    this.authService.login(this.usuario.email, this.usuario.senha)
    .then(response=>{
      this.router.navigate(['/dashboard', 'admin']);
      this.displaySpinner = false;
    })
    .catch(erro=>{
      console.log(erro); 
      if(erro.status === 400){
        this.toastService.showError("Usuario ou senha inválido");
        this.usuario.senha = "";
      }else{
        this.errorHandler.handle(erro);
      }
      this.displaySpinner = false;
    });
  }
  
}
