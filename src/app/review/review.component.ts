import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Review } from '../models/review';

import { StoreService } from '../services/store.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  private _storeID : string;
  newReviewErrMsg: string;
  comment: string;
  user: any;
  
  reviews: Review[];
  private subscribeReview;

  constructor(private authService :AuthenticationService, private storeService :StoreService) { }

  ngOnInit() {
    this.loadComments(this.storeID);
    this.authService.retrieveUser().subscribe(user => {
      this.user = user;  
    });
  }

  ngOnDestroy() {
    this.subscribeReview.unsubscribe();
  }
  
  @Input()
  set storeID(id: string) {
    this._storeID = id;
  }
  
  get storeID() {
    return this._storeID;
  }
  
  saveComment(formData) {
    this.newReviewErrMsg = '';
    if(!formData.valid) {
      console.log('Nao ta valido');
      return;
    }
    
    let userID = this.authService.userID;
    let userName = this.user ? this.user.name : '---';
    
    let review: Review = {
      ownerID: userID,
      ownerName: userName,
      storeID: this.storeID,
      
      rating: formData.value.rating,
      comment: this.comment,
    }
    
    this.storeService.addReview(review).subscribe(
      (data) => { },
      (error) => {
        console.log('error', this.newReviewErrMsg);
      }
    );
  }
  
  loadComments(storeID: string) {
    let reviewObservable = this.storeService.getReviews(storeID).valueChanges();
    this.subscribeReview = reviewObservable.subscribe(
      (reviews) => {
        this.reviews = reviews as Review[];
      },
      (error) => {
        console.log('error', this.newReviewErrMsg);
      }
    );
  }
  

}
