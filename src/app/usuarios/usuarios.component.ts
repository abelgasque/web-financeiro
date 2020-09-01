import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { AuthService } from '../seguranca/auth.service';
import { ConfirmationService } from 'primeng/api';
import { Usuario } from '../core/model';
import { ToastService } from '../shared/components/toast/toast.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario = new Usuario();
  usuarios: any[] = [];
  display: boolean = false;
  displaySpinner: boolean = false;
  constructor(
    public auth: AuthService,
    private usuariosService: UsuariosService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getTabela();
  }
  
  getRetornoPersistencia(usuario: Usuario){
    if(usuario != null){
      this.getTabela();
    }
  }

  novoUsuario(){
    this.usuario = new Usuario();
    this.display = true;
  }

  getTabela(){
    this.displaySpinner = true;
    this.usuarios = [];
    this.usuariosService.listar()
    .then(response=> {
      this.usuarios = response;
      this.displaySpinner = false;
    })
    .catch(error =>{
      console.log(error);
      this.displaySpinner = false;
      this.toastService.showError("Erro ao listar usuários");
    });
  }

  confirmarExclusao(id: number){
    this.confirmationService.confirm({message: 'Tem certeza que deseja excluir usuário?',
    accept: ()=>{
      this.excluirById(id);
    }});
  }

  excluirById(id: number){
    this.displaySpinner = true;
    this.usuariosService.excluir(id)
    .then(response =>{
      this.getTabela();
      this.displaySpinner = false;
    })
    .catch(error => {
      console.log(error);
      this.displaySpinner = false;
      if(error.status == 409){
        this.toastService.showError("Erro ao excluir. Usuário vinculado a uma pessoa.");
      }else{
        this.toastService.showError("Erro ao excluir usuário");
      }
    });
  }

  getUsuario(id: number){
    this.buscarPorId(id);
    this.display=true;
  }

  buscarPorId(id: number){
    this.displaySpinner = true;
    this.usuario = new Usuario();
    this.usuariosService.buscarPorId(id)
    .then(response =>{
      this.usuario = response;
      this.displaySpinner = false;
    })
    .catch(error =>{
      console.log(error);
      this.displaySpinner = false;
      this.toastService.showError("Erro ao buscar usuário");
    });
  }
}
