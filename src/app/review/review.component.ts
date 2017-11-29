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
  
  reviews: Review[];
  private reviewObservable;

  constructor(private authService :AuthenticationService, private storeService :StoreService) { }

  ngOnInit() {
    this.loadComments(this.storeID);
  }
  
  ngOnDestroy() {
    this.reviewObservable.unsubscribe();
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
    
    let review: Review = {
      onwerID: userID,
      storeID: this.storeID,
      
      rating: formData.value.rating,
      comment: this.comment,
    }
    
    this.storeService.addReview(review).subscribe(
      (data) => {
        console.log('info', data);
      },
      (error) => {
        console.log('error', this.newReviewErrMsg);
      }
    );
    
  }
  
  loadComments(storeID: string) {
    this.reviewObservable = this.storeService.getReviews(storeID).valueChanges();
    this.reviewObservable.subscribe(
      (reviews) => {
        console.log('info', reviews);
        this.reviews = reviews as Review[];
      },
      (error) => {
        console.log('error', this.newReviewErrMsg);
      }
    );
    
  }
  

}
