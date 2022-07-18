import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(private storage: Storage, private router :Router){
    this.storage.create();
  }

  async canActivate(){
    const isIntroShowed =  await this.storage.get('isIntroShowed')

    if(isIntroShowed){
      return true;
    }
    else{
      this.router.navigateByUrl('/intro');
    }
  }

  /*
  function resolveAfter2Seconds(x){
    return new Promise(resolve =>{
      setTimeout(() =>{
        resolve(x);
      }, 200);
    })
  }

  async function add1(x){
    const a = await resolveAfter2Seconds(20); //<----- pausa 2 segundos
    const b = await resolveAfter2Seconds(30); //<----- pausa 2 segundos 
    return x+a+b;
  }

  add1(10).then(v=>{
    console.log(v); // va a imprimir 60 en 4 segundos
  })

  async function add2(x) {
    const p_a = await resolveAfter2Seconds(20); //<----- pausa 2 segundos
    const p_b = await resolveAfter2Seconds(30); //<----- pausa 2 segundos 
    return x + await p_a + await p_b;
  }

  add2(10).then(v=>{
    console.log(v); // va a imprimir 60 en 2 segundos
  })
  */
  
}
