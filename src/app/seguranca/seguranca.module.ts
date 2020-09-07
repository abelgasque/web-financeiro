import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { JwtModule } from '@auth0/angular-jwt';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { AuthGuard } from './auth.guard'
import { environment } from '../../environments/environment';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaComponent } from './seguranca.component';
import { SharedModule } from '../shared/shared.module';
import { LogoutService } from './logout.service';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { SegurancaPessoaFormComponent } from './seguranca-pessoa-form/seguranca-pessoa-form.component';
import { PessoasModule } from '../pessoas/pessoas.module';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    SegurancaComponent,
    LoginFormComponent,
    SegurancaPessoaFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    }),
    FlexLayoutModule,

    DialogModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    InputMaskModule,
    ConfirmDialogModule,

    MatCardModule,
    MatButtonModule,

    SharedModule,
    PessoasModule

  ],
  providers: [
    ConfirmationService,
    LogoutService,
    AuthGuard
  ]
})
export class SegurancaModule { }
