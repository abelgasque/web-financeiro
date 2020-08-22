import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.isAccessTokenInvalido()){
      console.log('Access token inválido, obtendo um novo.');
      return this.auth.obterNovoAccessToken()
      .then(response =>{
        if(this.auth.isAccessTokenInvalido()){
          this.router.navigate(['/seguranca','login-autenticao']);
          return false;
        }
        return true;
      });
    }

    if(next.data.roles && !this.auth.temQualquerPermissao(next.data.roles)){
      this.router.navigate(['/nao-autorizado']);
      return false;
    }

    return true;
  }
  
}
