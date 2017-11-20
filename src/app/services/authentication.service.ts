import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthenticationService {
    
    private authState: any;
    
    constructor(public afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe((auth) => {
          this.authState = auth
        });
        
    }
    
    createUserWithEmailAndPassword(email, password) {
        let promise = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
        return Observable.fromPromise(promise);
    }
    
    signInWithEmailAndPassword(email, password) {
        let promise = this.afAuth.auth.signInWithEmailAndPassword(email, password);
        return Observable.fromPromise(promise);
    }
    
    logout() {
        return this.afAuth.auth.signOut();
    }
    
    get authenticated(): boolean {
        return this.authState !== null;
    }
    
    get user(): any {
        return this.authenticated ? this.authState : null;
    }
    
    get id(): string {
        return this.authenticated ? this.authState.uid : '';
    }
    
    get currentUserAnonymous(): boolean {
        return this.authenticated ? this.authState.isAnonymous : false
    }
    
    get currentUserDisplayName(): string {
        if (!this.authState)
            return 'Guest';
        
        if (this.currentUserAnonymous)
            return 'Anonymous';
        
        return (this.authState['displayName'] || 'User without a Name');
    }
    
    /*
    signInWithGoogle(): firebase.Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {
        this.db.object(`/users/${response.user.uid}`)
          .subscribe(user => {
            if (!user.$exists()) {
              let {displayName, email, emailVerified, photoURL, uid} = response.user;
              this.db.object(`/users/${response.user.uid}`).set({
                displayName,
                email,
                emailVerified,
                photoURL,
                uid
              })
            }
          });
      })
      .catch(err => console.log('ERRROR @ AuthService#signIn() :', err));
    }
    */
    

    
    
}