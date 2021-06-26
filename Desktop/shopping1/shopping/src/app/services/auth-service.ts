import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from '../interfaces/Ilogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements  CanActivate {
  user:User;
  constructor(public loginService: LoginService, public router: Router) {}
  canActivate(): boolean {
    if(this.loginService.isLogged()){
      return true;
    }else{
      this.router.navigate([''])
      return false;
    }
  }
}
