import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthenticationService {
    
    constructor(public afAuth: AngularFireAuth) { }
    
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
    
    get currentUser(): any {
        return this.afAuth.auth.currentUser;
    }
    
    

    
    
}