import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm : FormGroup;

  validation_messages = {
    email: [
      {type : "required", message: "El email es obligatorio"},
      {type : "pattern", message: "El email no es válido"},
    ],
    password: [
      {type : "required", message: "La contraseña es obligatoria"},
      {type : "minlength", message: "La contraseña debe tener más de 5 caracteres"},
    ]
  }

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
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
