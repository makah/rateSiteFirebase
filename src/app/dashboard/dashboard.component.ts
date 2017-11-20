import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService :AuthenticationService, private router: Router) { }

  ngOnInit() {
    var user = this.authService.currentUser;
    if (!user) {
      let errValue = 101;
      this.router.navigate(['/login', errValue]);
    }
    else{ 
      console.log(user);
    }
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
