import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  state: string = '';
  errMsg: string = '';

  constructor(private authService :AuthenticationService, private router: Router) { }
  
  ngOnInit() {  }

  onSubmit(formData) {
    this.errMsg = '';
    if(!formData.valid) {
      console.log('Nao ta valido');
      return;
    }
    
    this.authService.createUserWithEmailAndPassword(formData.value.email,formData.value.password).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle Errors here.
        var errorCode = error.code;
        if (errorCode == 'auth/weak-password') {
          this.errMsg = 'The password is too weak.';
        } else {
          this.errMsg = error.message;
        }
        console.log(this.errMsg);
      }
    );
  }
}
