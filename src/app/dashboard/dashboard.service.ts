import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { GenericHttp } from 'src/app/seguranca/generic-http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosUrl: string;

  constructor(private http: GenericHttp) { 
    this.lancamentosUrl = `${this.lancamentosUrl}`;
  }

  estatisticasLancamentosPorCategoria(): Promise<any> {
    return this.http.get<Promise<Array<any>>>(`${this.lancamentosUrl}/estatisticas/por-categoria`)
    .toPromise();
  }

  estatisticasLancamentosPorDia(): Promise<any> {
    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-dia`)
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
}
