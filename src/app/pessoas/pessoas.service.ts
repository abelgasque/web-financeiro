import { Injectable } from '@angular/core';
import { HttpParams, HttpClient} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { PessoaFilter } from 'src/app/core/model';


@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  urlPessoa : string;

  constructor(
    private http: HttpClient) {
    this.urlPessoa = `${environment.apiUrl}/pessoas`;
   }

  pesquisar(filtro: PessoaFilter): Promise<any>{
    let params = new HttpParams({
      fromObject:{
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });
    if(filtro.nome){
      params = params.append('nome', filtro.nome);
    }
    if(filtro.cpf){
      params = params.append('cpf', filtro.cpf);
    }
    return this.http.get<any>(`${this.urlPessoa}/pesquisar?resumo`,{params})
    .toPromise()
    .then(response => {
      const pessoas = response.content;
      const resultados = {
        pessoas: pessoas,
        total: response.totalElements,
      }
      return resultados;
    });
  }

  salvar(entidade: any): Promise<any> {
    return this.http.post<any>(`${this.urlPessoa}/adicionar`, entidade).toPromise();
  }
  
  editar(entidade: any): Promise<any> {
    return this.http.put<any>(`${this.urlPessoa}`, entidade).toPromise();
  }

  buscarPorId(id: number): Promise<any> {
    return this.http.get<any>(`${this.urlPessoa}/${id}`).toPromise();
  }

  buscarPorUsuarioId(id: number): Promise<any> {
    return this.http.get<any>(`${this.urlPessoa}/buscar-por-usuario/${id}`).toPromise();
  }

  listar(): Promise<any> {
    return this.http.get(`${this.urlPessoa}`).toPromise();
  }

  excluir(id: number): Promise<any>{
    return this.http.delete(`${this.urlPessoa}/${id}`).toPromise();
  }
}
