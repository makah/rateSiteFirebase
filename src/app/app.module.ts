import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Services
import { StoreService } from './services/store.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuard } from './services/authentication.guard';

//Components
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewStoreComponent } from './new-store/new-store.component';
import { SearchComponent } from './search/search.component';
import { StoreComponent } from './store/store.component';
import { ReviewComponent } from './review/review.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    NewStoreComponent,
    SearchComponent,
    StoreComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    
  ],
  providers: [AuthenticationService, AuthenticationGuard, StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
