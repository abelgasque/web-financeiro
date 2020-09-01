import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  urlLancamentos: string;

  constructor(private http: HttpClient) {
    this.urlLancamentos = `${environment.apiUrl}/lancamentos/relatorios`;
  }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    const params = new HttpParams()
      .append('inicio', moment(inicio).format('YYYY-MM-DD'))
      .append('fim', moment(fim).format('YYYY-MM-DD'));

    return this.http.get(`${this.urlLancamentos}/por-pessoa`, { params, responseType: 'blob' })
    .toPromise();
  }
}
