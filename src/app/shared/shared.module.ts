import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';

import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {SidebarModule} from 'primeng/sidebar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ScrollPanelModule} from 'primeng/scrollpanel';

import {NavbarComponent} from './components/navbar/navbar.component';
import {ToastComponent} from './components/toast/toast.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import { FooterComponent } from './components/footer/footer.component';
import { BigChartLancamentosMesalComponent } from './components/big-chart-lancamentos-mesal/big-chart-lancamentos-mesal.component';
import { PieLancamentosCategoriaComponent } from './components/pie-lancamentos-categoria/pie-lancamentos-categoria.component';
import { PieLancamentosTipoComponent } from './components/pie-lancamentos-tipo/pie-lancamentos-tipo.component';
import { CardsHeaderDashboardComponent } from './components/cards-header-dashboard/cards-header-dashboard.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ToastComponent,
    SpinnerComponent,
    FooterComponent,
    BigChartLancamentosMesalComponent,
    PieLancamentosCategoriaComponent,
    PieLancamentosTipoComponent,
    CardsHeaderDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    ChartsModule,
    FlexLayoutModule,
    CurrencyMaskModule,
    
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    
    SidebarModule,
    ToastModule,
    ProgressSpinnerModule,
    ScrollPanelModule
  ],
  exports: [
    NavbarComponent,
    ToastComponent,
    SpinnerComponent,
    FooterComponent,
    BigChartLancamentosMesalComponent,
    PieLancamentosCategoriaComponent,
    PieLancamentosTipoComponent,
    CardsHeaderDashboardComponent
  ],
  providers:[
    MessageService
  ]
})
export class SharedModule { }
