import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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

import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardPessoaComponent } from './dashboard-pessoa/dashboard-pessoa.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { RouterModule } from '@angular/router';


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
    SharedModule,
    
  ],
  exports:[
    DashboardPessoaComponent
  ]
})
export class DashboardModule { 
  
}
