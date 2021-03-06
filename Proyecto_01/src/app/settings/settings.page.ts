import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  userImage = "assets/images/profile.png";
  photo: SafeResourceUrl;

  user = {
    email: "",
    name: "",
    last_name: "",
    following_users: [],
    followed_users: [],
    image: ""
};
  user_id;
  goBack = false;
  users: any;
  searching = false;
  text = "Digite nombre de usuario para buscar";

  constructor( 
                private authService: AuthenticateService,
                private sanitizer: DomSanitizer,
                private storage: Storage,
                private alertController: AlertController,
                private navCtrl: NavController,
                private userService: UserService
                ) { this.storage.create(); }

  async ngOnInit() {
    this.user_id = await this.storage.get("user_id")
    await this.userService.getCurrentUser(this.user_id).subscribe((data: any) => {
      this.user.email = data.email
      this.user.name = data.name
      this.user.last_name = data.last_name
      this.user.followed_users = data.followed_users
      this.user.following_users = data.following_users
      this.user.image = data.image
    },
    (error) => 
      this.presentAlert("Opps", "hubo un error", error)
    )
    if (this.goBack){
      this.navCtrl.navigateBack("/menu")
    }
  }

  async presentAlert(header, subHeader,message) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {text: 'OK', 
        handler: () => { this.goBack = true }
      }
      ]
    });
    await alert.present();
  }

  async takePhoto(){
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, //es decir lo convierte a un string data url -> facil acceso
      //resultType: CameraResultType.Base64, //es decir lo convierte a un string en base 64
      //resultType: CameraResultType.Uri, // te devuelve el link donde esta la foto
      //source: CameraSource.Camera //abre la c??mara del celular
      source: CameraSource.Photos // abre el explorador de archivos para elegir una imagen
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl( //le dara confianza a nuestro resource url
      image && image.dataUrl
    ); 
    console.log(image);
    this.updateUser({"image": image.dataUrl})
  }

  updateUser( user ){
    let update_params = user
    this.userService.updateUser(this.user_id, update_params).then((data:any) => {
      this.user.email = data.user.email
      this.user.name = data.user.name
      this.user.last_name = data.user.last_name
      this.user.followed_users = data.user.followed_users
      this.user.following_users = data.user.following_users
      this.user.image = data.user.image
    })
  }

  async updateInfo() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Actualizar Nombre';
    alert.inputs = [
      {
        name: 'name',
        placeholder: 'Nombres (max 30 caracteres)',
        attributes: {
          maxlength: 30
        }
      },
      {
        name: 'last_name',
        placeholder: 'Apellidos (max 50 caracteres)',
        attributes: {
          maxlength: 50
        }
      },
    ];
    alert.buttons = [
      {
        text: 'Cancelar',
        // cssClass: 'alert-button-cancel'
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Actualizar',
        cssClass: 'alert-button-confirm',
        handler: (alertData) => {
          // console.log(alertData.name);
          // console.log(alertData.last_name);
          this.updateUser({"name": alertData.name, "last_name": alertData.last_name});
        }
      }
    ];
    // alert.buttons = ['Actualizar'];

    document.body.appendChild(alert);
    await alert.present();
  }

  getUsers(keyword: string){
    this.searching = true;
    if ( keyword.length > 0 ) {
      this.userService.getUser(keyword).subscribe(resp => {
        this.users = resp;
        if (this.users.length === 0 ){
          this.text = "no se encontraron usuarios con ese nombre"
        }else{
          this.users.forEach(user => {
            user["follow"] = false
            user.following_users.forEach(following_user => {
              if (following_user.follower_id == this.user_id) {
                user["follow"] = true
              }
            })
          });
        }
        this.searching = false;
      });

    }else{
      this.text = "ingrese un nombre para buscar"
      this.users = [];
    }
  }

  followUser(followee_id){

   this.userService.followUser(followee_id, this.user_id).subscribe( async (resp: any) => {
      this.presentAlert("Follow","",resp.msg)
      this.users.forEach( user  => {
        if (followee_id == user.id){
          user["follow"] = true
          let newFolleew = parseInt(document.getElementById("followee").textContent) + 1
          document.getElementById("followee").textContent = newFolleew.toString();
        }
      })
    } ) 
  }

  unfollowUser(followee_id){

    this.userService.unfollowUser(followee_id, this.user_id).subscribe( async (resp: any) => {
       this.presentAlert("Unfollow","",resp.msg)
       this.users.forEach( user  => {
         if (followee_id == user.id){
           user["follow"] = false
           let newFolleew = parseInt(document.getElementById("followee").textContent) - 1
           document.getElementById("followee").textContent = newFolleew.toString();
         }
       })
     } ) 
   }

}
