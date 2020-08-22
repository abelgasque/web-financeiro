import { Injectable } from '@angular/core';
import { HttpParams} from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { LancamentoFilter, Lancamento } from 'src/app/core/model';
import { GenericHttp } from 'src/app/seguranca/generic-http';


@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  constructor(private http: GenericHttp) { }

  pesquisar(filtro: LancamentoFilter): Promise<any>{
    let params = new HttpParams({
      fromObject:{
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });
    if(filtro.descricao){
      params = params.append('descricao', filtro.descricao);
    }
    if(filtro.vencimentoDe){
      params = params.append('dataVencimentoDe', moment(filtro.vencimentoDe).format('YYYY-MM-DD'));
    }
    if(filtro.vencimentoAte){
      params = params.append('dataVencimentoAte', moment(filtro.vencimentoAte).format('YYYY-MM-DD'));
    }
    return this.http.get<any>(`${environment.apiUrl}/lancamentos/pesquisar`, {params})
    .toPromise()
    .then(response => {
      let lancamentos = response.content;
      let resultados = {
        lancamentos: lancamentos,
        total: response.totalElements,
      }
      return resultados;
    })
    .catch(erro => {
      return Promise.reject(erro);
    });
  }

  salvar(entidade: any): Promise<any> {
    return this.http.post<Lancamento>(`${environment.apiUrl}/lancamentos`, entidade)
    .toPromise();
  }
  
  editar(entidade: any): Promise<any> {
    return this.http.put<Lancamento>(`${environment.apiUrl}/lancamentos`, entidade)
    .toPromise()
    .then(response => response);
  }

  buscarPorId(id: number): Promise<any> {
    return this.http.get<Lancamento>(`${environment.apiUrl}/lancamentos/${id}`)
    .toPromise()
    .then(response => response);
  }

  listar(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/lancamentos`,)
    .toPromise()
    .then(response => response);
  }

  excluir(id: number): Promise<any>{
    return this.http.delete(`${environment.apiUrl}/lancamentos/${id}`)
    .toPromise()
    .then(response => null);
  }
}
