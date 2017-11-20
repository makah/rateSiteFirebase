import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  errMsg : string;
  private sub: any;

  constructor(private authService :AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() { 
    this.sub = this.route.params.subscribe(params => {
      if(params['errValue'] && +params['errValue'] == 101){
        this.errMsg = 'Você precisa se conectar para acessar a área privada';
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  
  onSubmit(formData) {
    this.errMsg = '';
    if(!formData.valid) {
      console.log('Nao ta valido');
      return;
    }
    
    this.authService.signInWithEmailAndPassword(formData.value.email,formData.value.password).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Handle Errors here.
        var errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          this.errMsg = 'Wrong password.';
        } else {
          this.errMsg = error.message;
        }
        console.log(this.errMsg);
      }
    );
  }
  

}
