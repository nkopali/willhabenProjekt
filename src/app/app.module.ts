import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import { UserFeedComponent } from './user-feed/user-feed.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { MapComponent } from './map/map.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ServerService } from './server.service';
import {AddPostComponent} from './add-post/add-post.component';
import {SearchFeedComponent} from './search-feed/search-feed.component';
import { MessagesComponent } from './messages/messages.component';
import {ButtonModule, CardModule, FieldsetModule, InputTextModule, MenuModule, ScrollPanelModule, TabMenuModule} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TokenInterceptor} from './t';
import { MyPostComponent } from './my-post/my-post.component';
import { FilterPipe } from './filter.pipe';
import { MainComponent } from './main/main.component';
@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserFeedComponent,
    UserSignupComponent,
    AddPostComponent,
    SearchFeedComponent,
    MapComponent,
    MessagesComponent,
    FilterPipe,
    MyPostComponent,
    MainComponent,
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

    FormsModule,
    ReactiveFormsModule,
    TabMenuModule,
    CardModule
  ],
  providers: [ServerService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
