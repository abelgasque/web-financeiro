import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider'

import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    DefaultComponent, 
    HomeComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,

    FlexLayoutModule,
    
    SharedModule
  ]
})
export class DefaultModule { }
