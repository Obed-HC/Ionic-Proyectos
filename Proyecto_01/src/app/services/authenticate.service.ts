import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  url_server = "https://music-back-seminario.herokuapp.com/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', observe: 'response' })
  };

  constructor(private storage: Storage,
              private http: HttpClient) { 
    this.storage.create();
  }

  loginUser(credentials){
    /*
    return new Promise((accept, rejects)=>{

      this.storage.get("user").then((data)=>{
        //console.log(data);
        if(credentials.email == data.email && credentials.password == atob(data.password)){
          accept("Login Exitoso");
        } else{
          rejects("Login Fallido");
        }

      }).catch(err=>{
        return rejects("Fallo en el Login");
      });
    });
    */

    let params = {
      "user": credentials
    }

    return new Promise((accept, rejects)=>{

      this.http.post(`${this.url_server}login`, params, this.httpOptions).subscribe((data: any) => {
        if (data.status = "OK") {
          accept(data);
        }else{
          rejects("Email o Contraseña Invalida");
        }
      },
      (error) => {
        return rejects("Error en la peticion")
      });
    });

  }
  
  register(userData){
    // userData.password = btoa(userData.password); //encripta la contraseña en codigo ascii (en base 64)
    // return this.storage.set("user", userData);

    let params = {
      "user": userData
    }
    return new Promise ((accept, reject) => {
      this.http.post(`${this.url_server}signup`, params, this.httpOptions).subscribe((data: any) => {
        if (data.status = "OK") {
          accept(data.msg);
        }else{
          reject(data.errors)
        }
      },
      (error) => {
        reject("Error en la peticion")
      });
    });

  }

}
