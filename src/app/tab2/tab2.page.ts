import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  constructor(
    private db: AngularFirestore,
    private storage: Storage
    ) {}

    historyURLs = [];

  ngOnInit(){
    this.storage.get('userid').then(id => {
      if(id){
        this.getAllData(id);
      }
    })
  }

  getAllData(id){
    const docRef = this.db.collection('Sent-URL-History').doc(id);
    docRef.get().toPromise().then(doc => {
      if(doc.exists){
        this.historyURLs = doc.data().urls;
      }
    });
  }

}
