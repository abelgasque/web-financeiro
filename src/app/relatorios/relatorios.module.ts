import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import { RelatoriosComponent } from './relatorios.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    RelatorioLancamentosComponent, 
    RelatoriosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    SharedModule,

    InputTextModule,
    CalendarModule,
    ButtonModule,
    AccordionModule
  ]
})
export class RelatoriosModule { }
