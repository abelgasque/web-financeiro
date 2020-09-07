import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/core/model';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {
  
  
  @Input() display: boolean;
  @Input() usuario: Usuario;
  @Output() eventDisplay = new EventEmitter<boolean>();
  @Output() retornoPersistencia = new EventEmitter<Usuario>();
  situacoes = [
    { label: 'Ativo', value: 'ATIVO' },
    { label: 'Inativo', value: 'INATIVO'}
  ];
  listaPermissoes: any[] = [];

  constructor(
    private usuariosService: UsuariosService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.carregarPermissoes();
  }

  fecharDisplay(form: NgForm) {
    this.usuario = new Usuario();
    form.resetForm();
    this.eventDisplay.emit(false);
  }

  adicionar(form: NgForm){
    this.usuariosService.salvar(this.usuario)
    .then(response => {
      this.retornoPersistencia.emit(response);
      this.fecharDisplay(form);
      this.toastService.showSuccess("Usuario adicionado com sucesso!");
    })
    .catch(error => {
      console.log(error);
      if(error.status == 409){
        this.toastService.showError(error.error.message);
      }else{
        this.toastService.showError("Erro ao adicionar usuário!");
      }
    });
  }

  editar(form: NgForm){
    this.usuariosService.editar(this.usuario)
    .then(response => {
      this.retornoPersistencia.emit(response);
      this.fecharDisplay(form);
      this.toastService.showSuccess("Usuario editado com sucesso!");
    })
    .catch(error => {
      console.log(error);
      if(error.status == 409){
        this.toastService.showError(error.error.message);
      }else{
        this.toastService.showError("Erro ao editar usuário!");
      }
    });
  }

  confirmarEdicao(form: NgForm){
    this.confirmationService.confirm({message: 'Tem certeza que deseja editar usuário?',
    accept: ()=>{
       this.editar(form);
    }});
  }

  gerenciarPersistencia(form: NgForm){
    if(this.usuario.permissoes.length > 0){
      if(this.usuario.id > 0){
        this.confirmarEdicao(form);
      }else{
        this.adicionar(form);
      }  
    }else{
      this.toastService.showWarn("Selecione pelo menos uma permissão!");
    }
  }

  carregarPermissoes(){
    this.usuariosService.listarPermissoes()
    .then(response => {
      this.listaPermissoes = response;  
    })
    .catch(error => {
      console.log(error);
    })
  }

}
