import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputMaskModule} from 'primeng/inputmask';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';

import { SharedModule } from 'src/app/shared/shared.module';
import { ApoioService } from 'src/app/util/apoio.service';

import { PessoasComponent } from './pessoas.component';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';
import { PessoaContatoFormComponent } from './pessoa-contato-form/pessoa-contato-form.component';

@NgModule({
  declarations: [
    PessoasComponent, 
    PessoaFormComponent, PessoaContatoFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    
    SharedModule,
    
    TableModule,
    InputTextModule,
    ButtonModule,
    SelectButtonModule,
    InputMaskModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule
  ],
  providers:[
    ApoioService,
    ConfirmationService
  ],
  exports:[
    PessoaContatoFormComponent
  ]
})
export class PessoasModule { }
