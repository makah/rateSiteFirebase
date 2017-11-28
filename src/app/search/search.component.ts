import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '../models/store';

import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  private stores;
  private searchObservable;
  private lastKeypress: number = 0;

  constructor(private storeService: StoreService, private router: Router) { }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.searchObservable.unsubscribe();
  }
  
  search($event) {
    let keywords = $event.target.value
    
    if (keywords.length < 1)
      return;
    
    if ($event.timeStamp - this.lastKeypress < 200)
      return;
    
    
    this.lastKeypress = $event.timeStamp
    
    this.searchObservable = this.storeService.searchByStore(keywords).valueChanges();
    this.searchObservable.subscribe(stores => {
        this.stores = stores;
    });
  }
  
  enterStore() {
    
  }

}
