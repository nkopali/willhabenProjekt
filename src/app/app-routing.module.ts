import { NgModule } from '@angular/core';
import {UserLoginComponent} from './user-login/user-login.component';
import {RouterModule, Routes} from '@angular/router';
import {UserFeedComponent} from './user-feed/user-feed.component';
import {AuthGuard} from './auth.guard';
import {UserSignupComponent} from './user-signup/user-signup.component';
import {AddPostComponent} from '../app/add-post/add-post.component';
import {MyPostComponent} from '../app/my-post/my-post.component'
import {ModifyComponent} from './modify/modify.component';

const routes: Routes = [
  {path: '', redirectTo: '/user-feed', pathMatch: 'full'},//default page
  {path: 'user-login', component: UserLoginComponent},
  {path: 'user-signup', component: UserSignupComponent},
  {path:'user-feed', component:UserFeedComponent,canActivate:[AuthGuard]},
  {path:'add-post', component:AddPostComponent,canActivate:[AuthGuard]},
  {path:'my-post', component:MyPostComponent,canActivate:[AuthGuard]},
  {path:'modify', component:ModifyComponent,canActivate:[AuthGuard]},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
