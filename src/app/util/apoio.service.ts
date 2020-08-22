import { Injectable } from '@angular/core';
import { GenericHttp } from '../seguranca/generic-http';

@Injectable({
  providedIn: 'root'
})
export class ApoioService {

  constructor(private http: GenericHttp) { }

  getEnderecoPorCep(cep: string): Promise<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
    .toPromise()
    .then(response => response)
    .catch(erro => {
      return Promise.reject(erro);
    });
  }
}
