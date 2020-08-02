import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController,
    private db: AngularFirestore,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setUserId()
    }); 
  }

  setUserId(){
    this.storage.get('userid').then(id =>{
      if(!id){
        this.getUserIdPromt();
      }
    }).catch(error => {
      console.log("Error while setting userid");
    })

  }

  async getUserIdPromt(){
    const alert = await this.alertController.create({
      header: 'Enter your user Id',
      mode: 'ios',
      subHeader: 'It will be use to recieve URL',
      backdropDismiss: false,
      inputs: [{
        name: 'userId',
        type: 'text',
        placeholder: 'Enter Here'
      }
    ],
      buttons: [
        {
          text: 'Save',
          handler: (userid)=>{
            if(!userid.userId){
              this.getUserIdPromt();
            }
            this.storage.set("userid", userid.userId);
            const docRef = this.db.collection('User-URL').doc(userid.userId);
            docRef.set({url: ''}).then();
          }
        }
      ]
    });
    alert.present();
  }

}
