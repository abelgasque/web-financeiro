import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard'
import { JwtModule, JwtHelperService } from "@auth0/angular-jwt";

import { FinanceiroHttpInterceptor } from "src/app/seguranca/financeiro-http-interceptor";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { environment } from 'src/environments/environment';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaComponent } from './seguranca.component';
import { SharedModule } from '../shared/shared.module';
import { LogoutService } from './logout.service';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    SegurancaComponent,
    LoginFormComponent,
    UsuarioCadastroComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,

    SharedModule,
    MatCardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    
    MatButtonModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: environment.tokenWhitelistedDomains,
        disallowedRoutes: environment.tokenBlacklistedRoutes,
      },
    }),
  ],
  providers: [
    JwtHelperService,
    LogoutService,
    AuthGuard,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: FinanceiroHttpInterceptor,
        multi: true
    }
  ]
})
export class SegurancaModule { }
