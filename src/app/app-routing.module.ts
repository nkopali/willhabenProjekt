import {NgModule} from '@angular/core';
import {UserLoginComponent} from './user-login/user-login.component';
import {RouterModule, Routes} from '@angular/router';
import {UserFeedComponent} from './user-feed/user-feed.component';
import {AuthGuard} from './auth.guard';
import {UserSignupComponent} from './user-signup/user-signup.component';
import {MapComponent} from './map/map.component';
import {MessagesComponent} from './messages/messages.component';
import {AddPostComponent} from '../app/add-post/add-post.component';
import {SearchFeedComponent} from '../app/search-feed/search-feed.component';
import {MyPostComponent} from '../app/my-post/my-post.component';
import {MainComponent} from './main/main.component';

const routes: Routes = [
  {path: '', redirectTo: '/home/user-feed', pathMatch: 'full'}, //default page
  {path: 'user-login', component: UserLoginComponent},
  {path: 'user-signup', component: UserSignupComponent},
  {
    path: 'home', component: MainComponent, canActivate: [AuthGuard], children: [
      {path: 'user-feed', component: UserFeedComponent, canActivate: [AuthGuard]},
      {path: 'map', component: MapComponent, canActivate: [AuthGuard]},
      {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
      {path: 'modify', component: SearchFeedComponent, canActivate: [AuthGuard]},
      {path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard]},
      {path: 'my-post', component: MyPostComponent, canActivate: [AuthGuard]}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
