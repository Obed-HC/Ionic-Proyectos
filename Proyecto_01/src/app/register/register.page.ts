import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

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
    lastname: [
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
    private formBuilder: FormBuilder,
    private navCtrl: NavController
  ) {
    this.registerForm = this.formBuilder.group({
      name: new  FormControl(
        "",
        Validators.compose([
          Validators.required,
        ])
      ),
      lastname: new FormControl(
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

}
