import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private storage: Storage) { }

  public userid = '';

  ngOnInit() {
    this.storage.get('userid').then(id => {
      this.userid = id;
    }).catch(error => {
      console.log(error);
    });
  }

}
