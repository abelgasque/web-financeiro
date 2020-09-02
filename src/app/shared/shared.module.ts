import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

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

import { HighchartsChartModule } from 'highcharts-angular';

import {NavbarComponent} from './components/navbar/navbar.component';
import {ToastComponent} from './components/toast/toast.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChartAreaLancamentosComponent } from './widgets/chart-area-lancamentos/chart-area-lancamentos.component';
import { CardsFluxoCaixaComponent } from './widgets/cards-fluxo-caixa/cards-fluxo-caixa.component';
import { PieFluxoCaixaComponent } from './widgets/pie-fluxo-caixa/pie-fluxo-caixa.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ToastComponent,
    SpinnerComponent,
    FooterComponent,
    ChartAreaLancamentosComponent,
    CardsFluxoCaixaComponent,
    PieFluxoCaixaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    
    FlexLayoutModule,
    
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,

    HighchartsChartModule,
    
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
    ChartAreaLancamentosComponent,
    CardsFluxoCaixaComponent,
    PieFluxoCaixaComponent
  ],
  providers:[
    MessageService
  ]
})
export class SharedModule { }
