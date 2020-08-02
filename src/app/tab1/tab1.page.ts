import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as admin from 'firebase-admin';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  url: string = '';
  userId: string = '';

  constructor(private alert: AlertController, private db: AngularFirestore) {}

  async showAlert(message: string){
    const alert = this.alert.create({
      cssClass:'my-custom-class',
      mode: 'ios',
      message: message,
      buttons: ['OK']
    });
    await (await alert).present();
  }

  public shareURL(): void {
    if(this.userId.length <= 0){
      this.showAlert('Please enter Reciever User Id');
    }
    else if(this.url.length <= 0){
      this.showAlert('Please add a URL first to Share.');
    }
    else if(!this.validURL()){
      this.showAlert('URL is not valid , Please Check.');
    }
    else{
      const dataRef = this.db.collection("User-URL").doc(this.userId);
      dataRef.get().toPromise().then(data =>{
        if(data.exists){
          dataRef.set({url: this.url});
          this.showAlert('URL sent!');
          this.url = '';
          this.userId = '';
        }else{
          this.showAlert('UserId not exists, Please Ask for Valid id from Reciever');
        }
      })
    }
  }

  validURL(): boolean{
    try{
      new URL(this.url);
    }catch(_){
      return false;
    }
    return true;
  }

}
