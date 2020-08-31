import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  sideBarOpen: boolean = false;
  jwt: any = null;
  gerenciarBtnNavbar: boolean = false;
  encapsulation: ViewEncapsulation.None
  
  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { 
    this.get();
  }

  ngOnInit(): void {
    
  }

  get(){
    this.jwt = this.auth.jwtPayload;
    if(this.jwt == null){
      this.gerenciarBtnNavbar= false;
    }else{
      this.gerenciarBtnNavbar = true;
    }
  }
  
  logout(){
    this.logoutService.logout()
    .then(response=>{
      this.router.navigate(['']);
      this.gerenciarBtnNavbar= false;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
