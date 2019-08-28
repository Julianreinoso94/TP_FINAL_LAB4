import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-firebase-crud';
  constructor(private AFauth : AngularFireAuth, private router : Router, private db : AngularFirestore) { }

  
  logout(){
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }
}
