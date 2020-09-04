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

import {NavbarComponent} from './components/navbar/navbar.component';
import {ToastComponent} from './components/toast/toast.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChartPieLancamentosTipoComponent } from './components/chart-pie-lancamentos-tipo/chart-pie-lancamentos-tipo.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    NavbarComponent,
    ToastComponent,
    SpinnerComponent,
    FooterComponent,
    ChartPieLancamentosTipoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    
    ChartsModule,
    FlexLayoutModule,
    
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
    ChartPieLancamentosTipoComponent
  ],
  providers:[
    MessageService
  ]
})
export class SharedModule { }
