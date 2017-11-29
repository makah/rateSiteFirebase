import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

import { Store } from '../models/store';

import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  private store : Store;
  private id: string;

  constructor(private storeService: StoreService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let paramsTask = this.route.params.take(1).subscribe(params => {
      this.id = params['id'];
      let storeTask = this.storeService.getStore(this.id);
      storeTask.subscribe((store) => {
        this.store = store as Store;
      });
    });
  }
}
