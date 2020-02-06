import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';
import {UserLoginComponent} from './user-login/user-login.component';
import {UserSignupComponent} from './user-signup/user-signup.component';
import {UserFeedComponent} from './user-feed/user-feed.component';
import {AuthGuard} from './auth.guard';
import {MapComponent} from './map/map.component';
import {MessagesComponent} from './messages/messages.component';
import {SearchFeedComponent} from './search-feed/search-feed.component';
import {AddPostComponent} from './add-post/add-post.component';
import {MyPostComponent} from './my-post/my-post.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Willhaben';

  constructor(private router: Router) {
  }
  ngOnInit() {

  }

}

