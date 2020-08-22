import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GenericHttp } from '../seguranca/generic-http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl: string;

  constructor(private http: GenericHttp) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listar(): Promise<any> {
    return this.http.get(this.categoriasUrl)
    .toPromise();
  }
}
