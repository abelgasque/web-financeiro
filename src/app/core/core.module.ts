import { NgModule, LOCALE_ID } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';
import { RouterModule } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { ErrorHandlerService } from './error-handler.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { AuthService } from '../seguranca/auth.service';
import { PessoasService } from '../pessoas/pessoas.service';
import { LancamentosService } from '../lancamentos/lancamentos.service';
import { CategoriaService } from '../util/categoria.service';
import { ToastService } from '../shared/components/toast/toast.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { LancamentosModule } from '../lancamentos/lancamentos.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { RelatoriosModule } from '../relatorios/relatorios.module';
import { PessoasModule } from '../pessoas/pessoas.module';
import { DefaultModule } from '../default/default.module';
import { RelatoriosService } from '../relatorios/relatorios.service';
import { UsuariosModule } from '../usuarios/usuarios.module';


registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,

    UsuariosModule,
    LancamentosModule,
    DashboardModule,
    RelatoriosModule,
    PessoasModule,
    DefaultModule,
    ConfirmDialogModule
  ],
  declarations: [
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    DashboardService,
    PessoasService,
    LancamentosService,
    CategoriaService,
    ToastService,
    RelatoriosService,
    AuthService,

    ConfirmationService,
    MessageService,
    JwtHelperService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class CoreModule { }
