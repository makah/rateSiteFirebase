import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

import { Store } from '../models/store';

import { StoreService } from '../services/store.service';
import { ImageService } from '../services/image.service';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  private store : Store;
  private id: string;
  private logoURL: string;
  private hasMenu: boolean;
  
  private defaultLogo: string;

  constructor(private storeService: StoreService, private router: Router, private route: ActivatedRoute, private imageService: ImageService) {
    this.defaultLogo = '/assets/defaultLogo.jpg';
  }

  ngOnInit() {
    let paramsTask = this.route.params.take(1).subscribe(params => {
      this.id = params['id'];
      let storeTask = this.storeService.getStore(this.id);
      storeTask.subscribe((store) => {
        this.store = store as Store;
        this.logoURL = this.store && this.store.logo ? this.store.logo.url : this.defaultLogo;
        this.hasMenu = true;
      });
    });
  }
  
  downloadMenu() {
    if(this.store && this.store.menu) {
      this.imageService.getMenu(this.store.menu);
    }
  }
  
}
