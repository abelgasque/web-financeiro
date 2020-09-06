import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

export class Data {
  name:  string;
  y: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosUrl: string;

  constructor(private http: HttpClient) { 
    this.lancamentosUrl =`${environment.apiUrl}/lancamentos/estatisticas`;
  }

  estatisticasLencamentosPorPessoaById(idPessoa: number): Promise<any>{
    return this.http.get<Promise<Array<any>>>(`${this.lancamentosUrl}/por-pessoa-by-id/${idPessoa}`)
    .toPromise();
  }

  estatisticasLancamentosPorCategoria(idPessoa: number): Promise<any> {
    return this.http.get<Promise<Array<any>>>(`${this.lancamentosUrl}/por-categoria/${idPessoa}`)
    .toPromise();
  }

  estatisticasLancamentosPorTipoMensal(): Promise<any> {
    return this.http.get<Promise<Array<any>>>(`${this.lancamentosUrl}/por-tipo-mensal`)
    .toPromise();
  }

  estatisticasLancamentosPorMes(ano: number, idPessoa: number): Promise<any> {
    return this.http.get<Array<any>>(`${this.lancamentosUrl}/por-mes/${ano}/${idPessoa}`)
      .toPromise()
      .then(response => {
        const dados = response;
        this.converterStringsParaDatas(dados);
        return dados;
      });
  }

  converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }

  chartAreaLancamentos(){
    return [
      {
        name: 'Asia',
        data: [502, 635, 809, 947, 1402, 3634, 5268]
      }, {
          name: 'Africa',
          data: [106, 107, 111, 133, 221, 767, 1766]
      }, {
          name: 'Europe',
          data: [163, 203, 276, 408, 547, 729, 628]
      }, {
          name: 'America',
          data: [18, 31, 54, 156, 339, 818, 1201]
      }, {
          name: 'Oceania',
          data: [2, 2, 2, 6, 13, 30, 46]
      }
    ];
  }

  chartPieLancamentos(){
    return [
      {
        name: 'Chrome',
        y: 700,
        sliced: true,
        selected: true
      }, 
      { name: 'Internet Explorer',  y: 50 }, 
      { name: 'Firefox',  y: 300 }, 
    ]
  } 
}
