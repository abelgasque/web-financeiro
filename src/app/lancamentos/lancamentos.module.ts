import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CurrencyMaskModule } from "ng2-currency-mask";

import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {SelectButtonModule} from 'primeng/selectbutton';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {FileUploadModule} from 'primeng/fileupload';
import {TooltipModule} from 'primeng/tooltip';
import {SplitButtonModule} from 'primeng/splitbutton';

import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriaService } from 'src/app/util/categoria.service';
import { PessoasService } from '../pessoas/pessoas.service';
import { LancamentosComponent } from './lancamentos.component';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';

@NgModule({
  declarations: [
    LancamentosComponent,
    LancamentoFormComponent,
    LancamentosGridComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    
    SharedModule,
    
    CurrencyMaskModule,
    MatTabsModule,
    MatButtonModule,
    SelectButtonModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    InputTextareaModule,
    ConfirmDialogModule,
    FileUploadModule,
    TooltipModule,
    SplitButtonModule
  ],
  providers: [
    ConfirmationService,
    CategoriaService,
    PessoasService
  ]
})
export class LancamentosModule { }
