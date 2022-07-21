import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage: Storage) { 
    this.storage.create();
  }

  loginUser(credentials){
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
  }
  
  register(userData){
    userData.password = btoa(userData.password); //encripta la contraseña en codigo ascii (en base 64)
    return this.storage.set("user", userData);
  }
}
