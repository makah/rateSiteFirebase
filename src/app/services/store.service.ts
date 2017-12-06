import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

import { AngularFireDatabase } from 'angularfire2/database';

import { Store } from '../models/store';
import { Location } from '../models/location';
import { Review } from '../models/review';

@Injectable()
export class StoreService {

    private authState: any;

    constructor(private db: AngularFireDatabase) { }
    
    createStore(ownerID: string, storeData: Store, locationData: Location) {
        let newStore = this.db.list('/stores').push(undefined);
        let newStoreKey = newStore.key;
        let newLocation = this.db.list('/stores').push(undefined);
        let newLocationKey = newLocation.key;
        storeData.ownerID = ownerID;
        storeData.workingRegionID = newLocationKey;
        storeData.name = storeData.name.toLowerCase();
        
        let tasks = {};
        tasks["/stores/" + newStoreKey] = storeData;
        tasks["/locations/" + newLocationKey] = locationData;
        
        return this.db.object('/').update(tasks);
    }
    
    searchByStore(keywords: string) {
        return this.db.list('/stores', ref => { 
            return ref.orderByChild('name').startAt(keywords.toLowerCase()).endAt(keywords+"\uf8ff");
        });
    }

    searchByLocation(keywords: string) {
        return;
    }
    
    getStore(id: string) {
        return this.db.object('/stores/' + id).valueChanges();
    }
    
    addReview(review: Review){
        let newReviewID = this.db.list('/stores').push(undefined).key;
        let userID = review.ownerID;
        
        let tasks = {};
        tasks[`/reviews/${newReviewID}`] = review;
        tasks[`/users/${userID}/reviews/${newReviewID}`] = true;
        
        return Observable.fromPromise(this.db.object('/').update(tasks));
    }
    
    getReviews(storeID: string){
        return this.db.list('/reviews', ref => { 
            return ref.orderByChild('storeID').equalTo(storeID);
        });
    }
    
}

