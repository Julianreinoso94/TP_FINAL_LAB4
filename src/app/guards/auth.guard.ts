import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from 'util';

import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

//seria login guard del proyecto gast
  private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedOut = new BehaviorSubject<boolean>(true);


  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public isAuthenticated() {
console.log( "isAuthenticated");
    this.loggedIn.next(true);
    this.loggedOut.next(false);
  }

  constructor(private AFauth : AngularFireAuth,
    private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.AFauth.authState.pipe(map( auth => {

        if(isNullOrUndefined(auth)){
          this.router.navigate(['/alerta']);
          return false
        }else{
          this.isAuthenticated();
          return true
        }
        // console.log(auth);
        // return false;
      }))
  
  }


  





}
