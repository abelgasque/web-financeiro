import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { AuthService } from '../seguranca/auth.service';
import { ConfirmationService } from 'primeng/api';
import { Usuario } from '../core/model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario = new Usuario();
  usuarios: any[] = [];
  display: boolean = false;

  constructor(
    public auth: AuthService,
    private usuariosService: UsuariosService,
    private confirmationService: ConfirmationService
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
    this.usuarios = [];
    this.usuariosService.listar()
    .then(response=> {
      this.usuarios = response;
    })
    .catch(error =>{
      console.log(error);
    });
  }

  confirmarExclusao(id: number){
    this.confirmationService.confirm({message: 'Tem certeza que deseja excluir usuário?',
    accept: ()=>{
      this.excluirById(id);
    }});
  }

  excluirById(id: number){
    this.usuariosService.excluir(id)
    .then(response =>{
      this.getTabela();
    })
    .catch(error => {
      console.log(error);
    });
  }

  getUsuario(id: number){
    this.buscarPorId(id);
    this.display= true;
  }

  buscarPorId(id: number){
    this.usuario = new Usuario();
    this.usuariosService.buscarPorId(id)
    .then(response =>{
      this.usuario = response;
    })
    .catch(error =>{
      console.log(error);
    });
  }
}
