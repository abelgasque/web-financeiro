import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {PasswordModule} from 'primeng/password';
import {MultiSelectModule} from 'primeng/multiselect';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

import { UsuariosComponent } from './usuarios.component';
import { SharedModule } from '../shared/shared.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';



@NgModule({
  declarations: [UsuariosComponent, UsuarioFormComponent],
  imports: [
    CommonModule,
    FormsModule,

    PasswordModule,
    MultiSelectModule,
    TableModule,
    ButtonModule,
    DialogModule,
    SelectButtonModule,
    ConfirmDialogModule,
    InputTextModule,
    DropdownModule,
    
    SharedModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class UsuariosModule { }
