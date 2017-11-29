import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './login/login.component';
import { LogoutComponent }   from './logout/logout.component';
import { SignupComponent }      from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewStoreComponent } from './new-store/new-store.component';
import { SearchComponent } from './search/search.component';
import { StoreComponent } from './store/store.component';

import { AuthenticationGuard } from './services/authentication.guard';

const routes: Routes = [
  //{ path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'login/:errValue', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'search', component: SearchComponent },
  { path: 'store/:id', component: StoreComponent },
  { path: 'newStore', component: NewStoreComponent, canActivate: [AuthenticationGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}