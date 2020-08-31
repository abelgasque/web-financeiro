import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/core/model';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { ToastService } from 'src/app/shared/components/toast/toast.service';

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
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.carregarPermissoes();
  }

  fecharDisplay(form: NgForm) {
    this.usuario = new Usuario();
    form.resetForm();
    let value: boolean = false;
    this.eventDisplay.emit(value);
  }

  gerenciarPersistencia(form: NgForm){
    if(this.usuario.id > 0){
      this.editar(form);
    }else{
      this.adicionarUsuario(form);
    }
  }

  adicionarUsuario(form: NgForm){
    this.usuariosService.salvar(this.usuario)
    .then(response => {
      this.retornoPersistencia.emit(response);
      this.fecharDisplay(form);
      this.toastService.showSuccess("Usuario adicionado com sucesso!");
    })
    .catch(error => {
      console.log(error);
      this.toastService.showError("Erro ao adicionar usuário!");
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
      this.toastService.showError("Erro ao editar usuário!");
    });
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
