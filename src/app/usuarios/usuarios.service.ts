import { Injectable } from '@angular/core';
import { GenericHttp } from '../seguranca/generic-http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url : string;

  constructor(
    private http: GenericHttp) {
    this.url = `${environment.apiUrl}/usuarios`;
  }

  salvar(entidade: any): Promise<any> {
    return this.http.post<any>(`${this.url}`, entidade).toPromise();
  }
  
  editar(entidade: any): Promise<any> {
    return this.http.put<any>(`${this.url}`, entidade).toPromise();
  }

  buscarPorId(id: number): Promise<any> {
    return this.http.get<any>(`${this.url}/${id}`).toPromise();
  }

  listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise();
  }

  excluir(id: number): Promise<any>{
    return this.http.delete(`${this.url}/${id}`).toPromise();
  }

  listarPermissoes(): Promise<any> {
    return this.http.get(`${environment.apiUrl}/permissoes`).toPromise();
  }
}
