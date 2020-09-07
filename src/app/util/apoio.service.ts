import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ApoioService {

  constructor(private http: HttpClient) { }

  formatarDataStringPtBr(data: string) {
    return moment(data).format("DD/MM/YYYY");
  }

  armazenarIdPessoaStorage(idPessoa: number) {
    localStorage.setItem("idPessoa", idPessoa.toString());
  }

  limparIdPessoaStorage() {
    localStorage.removeItem("idPessoa");
  }

  getIdPessoaStorage() {
    return localStorage.getItem("idPessoa");
  }

  armazenarIdUsuarioStorage(idUsuario: number) {
    localStorage.setItem("idUsuario", idUsuario.toString());
  }

  limparIdUsuarioStorage() {
    localStorage.removeItem("idUsuario");
  }

  getIdUsuarioStorage() {
    return localStorage.getItem("idUsuario");
  }

  getCalendarioPtBr(){
    let data = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };
    return data;
  }

  getEnderecoPorCep(cep: string): Promise<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
    .toPromise()
    .then(response => response)
    .catch(erro => {
      return Promise.reject(erro);
    });
  }
}
