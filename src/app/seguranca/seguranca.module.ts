import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard'
import { JwtModule } from "@auth0/angular-jwt";

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
import { SegurancaRoutingModule } from './seguranca.routing.module';

export function tokenGetter() {
  return localStorage.getItem("access_token");
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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: environment.tokenWhitelistedDomains,
        disallowedRoutes: environment.tokenBlacklistedRoutes,
      },
    }),

    FlexLayoutModule,

    SharedModule,
    MatCardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    
    MatButtonModule,    
  ],
  providers: [
    LogoutService,
    AuthGuard
  ]
})
export class SegurancaModule { }
