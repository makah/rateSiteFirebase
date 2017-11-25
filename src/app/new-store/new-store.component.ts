import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '../models/store';
import { Location } from '../models/location';

import { StoreService } from '../services/store.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-new-store',
  templateUrl: './new-store.component.html',
  styleUrls: ['./new-store.component.css']
})
export class NewStoreComponent implements OnInit {

  constructor(private authService :AuthenticationService, private storeService :StoreService, private router: Router) { }

  ngOnInit() {
    
  }
  
  createStore() {
    let userID = this.authService.userID;
    
    let newStore: Store = {
      name: 'Oceana Investimentos',
      description: 'Um teste legal',
      phone: '(21) 3222-8200',
      tags: ['bom','bonito','barato'],
      ownerID: '',
      workingRegionID: '',
      cachedRating: 0,
      cachedCount: 0,
    }
    
    let newLocation: Location = {
      district: 'Ipanema',
      city: 'Rio de Janeiro',
      state: 'Rio de Janeiro',
      county: 'Brasil',
      lat: '-22.983830',
      long: '-43.207816',
    }
    
    this.storeService.createStore(userID, newStore, newLocation).then(function(){
        console.log('Loja criada');
    }, function(error) {
        console.log('Erro ao criar loja: ', error);
    });
  }

}