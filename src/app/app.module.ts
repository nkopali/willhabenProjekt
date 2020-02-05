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
import {AddPostComponent} from './add-post/add-post.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserFeedComponent,
    UserSignupComponent,
    AddPostComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
