import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthenticationService {
    
    private authState: any;
    private user: any;
    
    constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) { }
    
    load() {
        let promise = new Promise((resolve, reject) => {
            this.afAuth.authState.subscribe((auth) => {
                this.authState = auth
                resolve(true);
            },
                err => reject(err)
            );
        });
        
        return promise;
    }
    
    createUserWithEmailAndPassword(name, email, password) {
        let newUser = {
            name: name
        };
        
        let newAuthTask = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
        let newUserTask = newAuthTask.then((user) => {
            return this.db.object('/users/' + user.uid).set(newUser);
        });
        
        return Observable.fromPromise(newUserTask);
    }
    
    signInWithEmailAndPassword(email, password) {
        let promise = this.afAuth.auth.signInWithEmailAndPassword(email, password);
        return Observable.fromPromise(promise);
    }
    
    logout() {
        return this.afAuth.auth.signOut().then(function() {
          console.log('signOut: OK');
        }).catch(function(error) {
          console.log('signOut FAIL: ', error);
        });
    }
    
    retrieveUser(): any {
        if(this.authenticated === undefined){
            console.log('You need to authenticate first.');
            return null;
        }
        
        this.user = this.db.object('/users/'+ this.userID)
                        .valueChanges()
                        .publishReplay(1)
                        .refCount();
        
            
        return this.user;
    }
    
    get authenticated(): boolean {
        return (this.authState !== null && this.authState !== undefined);
    }
    
    get userAuth(): any {
        return this.authenticated ? this.authState : null;
    }
    
    get userID(): string {
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