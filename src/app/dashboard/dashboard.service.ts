import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { GenericHttp } from 'src/app/seguranca/generic-http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  
  constructor(private http: GenericHttp) { }

  estatisticasLancamentosPorCategoria(): Promise<any> {
    return this.http.get<Promise<any>>(`${environment.apiUrl}/lancamentos/estatisticas/por-categoria`)
    .toPromise();
  }

  estatisticasLancamentosPorDia(): Promise<any> {
    return this.http.get<Array<any>>(`${environment.apiUrl}/lancamentos/estatisticas/por-dia`)
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
