import { NgModule, LOCALE_ID } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import { ErrorHandlerService } from './error-handler.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { AuthService } from '../seguranca/auth.service';
import { PessoasService } from '../pessoas/pessoas.service';
import { LancamentosService } from '../lancamentos/lancamentos.service';
import { CategoriaService } from '../util/categoria.service';
import { ToastService } from '../shared/components/toast/toast.service';
import { GenericHttp } from '../seguranca/generic-http';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { LancamentosModule } from '../lancamentos/lancamentos.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { RelatoriosModule } from '../relatorios/relatorios.module';
import { PessoasModule } from '../pessoas/pessoas.module';
import { DefaultModule } from '../default/default.module';
import { RelatoriosService } from '../relatorios/relatorios.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
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
    
    JwtHelperService,
    GenericHttp,
    AuthService,
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class CoreModule { }
