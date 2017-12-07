import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams , HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';

import { environment } from '../../environments/environment';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  private newName: string;

  constructor(private authService :AuthenticationService, private router: Router, private http: HttpClient, private db: AngularFireDatabase) { }

  ngOnInit() { }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  changeNamePOST() {
    let userID = this.authService.userID;
    
    let url = environment.firebase.functionURL + '/changeUserName';
    
    let params = {
      id: userID,
      newName: this.newName
    }
    
    this.http.post(url,'', {params: params}).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
  
  changeName() {
    let userID = this.authService.userID;
    
    let updateTask = this.db.object(`/users/${userID}`).update({name : this.newName});
    
    return updateTask.then(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log('error', error);
      }
    );
    
    
  }
}
