import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  
  constructor(private auth: AuthenticationService, private router: Router) {}
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.afAuth.authState
      .take(1)
      .map(authState => !!authState)
      .do(authenticated => {
        console.log(this.auth.afAuth.authState);
        if (!authenticated) {
            let errValue = 101;
            this.router.navigate(['/login', errValue]);
        }
      });
  }
}
