import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthenticateService } from '../services/authenticate.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  validation_messages = {
    name: [
      {type : "required", message: "El nombre es obligatorio"},
    ],
    last_name: [
      {type : "required", message: "Los apellidos son obligatorios"},
    ],
    email: [
      {type : "required", message: "El email es obligatorio"},
      {type : "pattern", message: "El email no es válido"},
    ],
    password: [
      {type : "required", message: "La contraseña es obligatoria"},
      {type : "minlength", message: "La contraseña debe tener más de 5 caracteres"},
    ]
  }

  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private authService : AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.storage.create();
    this.registerForm = this.formBuilder.group({
      name: new  FormControl(
        "",
        Validators.compose([
          Validators.required,
        ])
      ),
      last_name: new FormControl(
        "",
        Validators.compose([
          Validators.required,
        ])
      ),
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$")
        ])
      ),
      password : new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      )
    })
   }

  ngOnInit() {
  }


  register(registerFormValues){
    this.authService.register(registerFormValues).then(()=>{
      this.navCtrl.navigateBack("/login");
    }).catch(err=>{
      this.presentAlert("Opps", "Hubo un error", err)
    })
  }

  goToLogin(){
    this.navCtrl.navigateBack("/login");
  }

  async presentAlert(header, subHeader,message) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  
}
