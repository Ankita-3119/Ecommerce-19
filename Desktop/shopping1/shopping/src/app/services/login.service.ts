import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/Ilogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn: any;
 
  constructor(private http:HttpClient) { }
  private url = 'http://localhost:5000/api' //connected to the node

  login(loginData:any){
    return this.http.post<any>('http://localhost:5000/api/login', loginData)
  }
  signup(data:any){
    return this.http.post<any>('http://localhost:5000/api/signup' , data);
  }

  isLogged(){
    return !!localStorage.getItem('token')
  }
}