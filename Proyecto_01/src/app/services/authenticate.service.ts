import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  loginUser(credentials){
    return new Promise((accept, rejects)=>{
      if(credentials.email == "obed@gmail.com" && credentials.password == "123456"){
        accept("Login Exitoso");
      } else{
        rejects("Login Fallido");
      }
    });
  }
}
