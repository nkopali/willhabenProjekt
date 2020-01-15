import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import { UserFeedComponent } from './user-feed/user-feed.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import {HttpClientModule} from '@angular/common/http';
import { ServerService } from './server.service';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserFeedComponent,
    UserSignupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
