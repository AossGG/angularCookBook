import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    // let config = {
    //   apiKey: "AIzaSyAa5GexDlMBVe10R9PHYfvX7CWwDZ7FALg",
    //   authDomain: "cook-b1b15.firebaseapp.com",
    //   databaseURL: "https://cook-b1b15.firebaseio.com",
    //   projectId: "cook-b1b15",
    //   storageBucket: "cook-b1b15.appspot.com",
    //   messagingSenderId: "1068868417507"
    // };
    // firebase.initializeApp(config);
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
