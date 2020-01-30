import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import { UserFeedComponent } from './user-feed/user-feed.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { MapComponent } from './map/map.component';
import {HttpClientModule} from '@angular/common/http';
import { ServerService } from './server.service';
import { MessagesComponent } from './messages/messages.component';
import {ButtonModule, FieldsetModule, InputTextModule, ScrollPanelModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserFeedComponent,
    UserSignupComponent,
    MapComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    FieldsetModule,
    ScrollPanelModule,
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
