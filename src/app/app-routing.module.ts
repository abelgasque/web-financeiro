import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './seguranca/auth.guard';
import { DefaultComponent } from './default/default.component';
import { LancamentosComponent } from './lancamentos/lancamentos.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin.component';
import { DashboardPessoaComponent } from './dashboard/dashboard-pessoa/dashboard-pessoa.component';
import { SegurancaComponent } from './seguranca/seguranca.component';
import { LoginFormComponent } from './seguranca/login-form/login-form.component'
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { UsuarioCadastroComponent } from './seguranca/usuario-cadastro/usuario-cadastro.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { RelatorioLancamentosComponent } from './relatorios/relatorio-lancamentos/relatorio-lancamentos.component';
import { HomeComponent } from './default/home/home.component';

const routes: Routes = [
  { path: 'lancamentos', 
    component:  LancamentosComponent, 
    canActivate: [AuthGuard],
    data: { roles:['ROLE_PESQUISAR_LANCAMENTO','ROLE_CADASTRAR_LANCAMENTO']}
  },
  { 
    path: 'pessoas', 
    component:  PessoasComponent, 
    canActivate: [AuthGuard],
    data: { roles:['ROLE_PESQUISAR_PESSOA','ROLE_CADASTRAR_PESSOA']}
  },
  { path: 'dashboard', 
    component:  DashboardComponent,
    canActivate: [AuthGuard], 
    children: [
      { 
        path: 'admin', 
        component: DashboardAdminComponent,
        canActivate: [AuthGuard]
      },
      { 
        path: 'pessoa', 
        component: DashboardPessoaComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { path: 'seguranca', 
    component: SegurancaComponent,
    children: [
      { 
        path: 'login-autenticacao', 
        component: LoginFormComponent, 
      },
      { 
        path: 'usuario-cadastro', 
        component: UsuarioCadastroComponent, 
      }
    ]
  },
  { path: 'relatorios', 
    component:  RelatoriosComponent, 
    canActivate: [AuthGuard],
    data: { roles:['ROLE_PESQUISAR_LANCAMENTO']},
    children: [
      { 
        path: 'lancamentos', 
        component: RelatorioLancamentosComponent,
        canActivate: [AuthGuard],
        data: { roles:['ROLE_PESQUISAR_LANCAMENTO']}
      },
    ]
  }, 

 
  { path: '',  component:  DefaultComponent, 
      children: [
        { path: '' , component: HomeComponent }
      ] 
    },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
