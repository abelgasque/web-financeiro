import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts';

import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';

import { MatDividerModule } from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HighchartsChartModule } from 'highcharts-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { TableModule } from 'primeng/table';

import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardPessoaComponent } from './dashboard-pessoa/dashboard-pessoa.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { TesteCursoComponent } from './teste-curso/teste-curso.component';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { DashboardCrudLancamentosComponent } from './dashboard-crud-lancamentos/dashboard-crud-lancamentos.component';



@NgModule({
  declarations: [
    DashboardComponent, 
    DashboardPessoaComponent, 
    DashboardAdminComponent, 
    TesteCursoComponent, DashboardCrudLancamentosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,

    ChartsModule,
    MatDividerModule,    
    ButtonModule,
    AccordionModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    HighchartsChartModule,
    FlexLayoutModule,
    CurrencyMaskModule,
    TableModule,
    DialogModule,
    InputMaskModule,
    InputTextModule,
    SelectButtonModule,
    CalendarModule,
    InputTextareaModule,
    DropdownModule,
    ConfirmDialogModule,
    FileUploadModule,
    SharedModule,
    
  ],
  exports:[
    DashboardPessoaComponent
  ]
})
export class DashboardModule { 
  
}
