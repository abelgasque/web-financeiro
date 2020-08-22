import { Injectable } from '@angular/core';
import { GenericHttp } from './generic-http';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeUrl = 'http://localhost:8080/tokens/revoke';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  logout(){
    return this.http.delete(this.tokensRevokeUrl,{withCredentials: true})
    .toPromise()
    .then(response =>{
      this.auth.limparAccessToken();
    });
  }

}
