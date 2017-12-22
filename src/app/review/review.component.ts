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
  lastReviewKey: string;
  
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
    };
    
    this.storeService.addReview(review).subscribe(
      (data) => { },
      (error) => {
        this.newReviewErrMsg = error;
        console.log('error', this.newReviewErrMsg);
      }
    ); 
  }
  
  loadComments(storeID: string) {
    let reviewObservable = this.storeService.getReviews(storeID, this.lastReviewKey).snapshotChanges();
    
    this.subscribeReview = reviewObservable.subscribe(
      (reviewSnapshot) => {
        
        let reviews :Review[] = [];
        reviewSnapshot.sort((a,b) => a.key <= b.key ? 1 : -1).forEach(snapshot => {
          let review = snapshot.payload.val();
          review.key = snapshot.key;
          
          reviews.push(review);
        });
        
        this.reviews = reviews;
        this.lastReviewKey = reviews[reviews.length -1].key;
        this.reviews.pop();
      },
      (error) => {
        this.newReviewErrMsg = error;
        console.log('error', this.newReviewErrMsg);
      }
    );
  }
  

}
