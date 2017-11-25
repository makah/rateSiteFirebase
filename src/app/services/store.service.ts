import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Store } from '../models/store';
import { Location } from '../models/location';

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
        
        let tasks = {};
        tasks["/stores/" + newStoreKey] = storeData;
        tasks["/locations/" + newLocationKey] = locationData;
        
        return this.db.object('/').update(tasks);
    }
    
}

