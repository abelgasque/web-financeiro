import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import {AccordionModule} from 'primeng/accordion';
import {ButtonModule} from 'primeng/button';

import {MatCardModule} from '@angular/material/card';

import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardPessoaComponent } from './dashboard-pessoa/dashboard-pessoa.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DashboardComponent, 
    DashboardPessoaComponent, 
    DashboardAdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    
    SharedModule,

    ChartsModule,
    
    ButtonModule,
    AccordionModule,
    MatCardModule
  ]
})
export class DashboardModule { 
  
}
