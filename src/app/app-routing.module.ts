import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserLoginComponent} from './user-login/user-login.component';
import {RouterModule, Routes} from '@angular/router';
import {UserFeedComponent} from './user-feed/user-feed.component';

const routes: Routes = [
  {path: '', redirectTo: '/user-login', pathMatch: 'full'},
  {path: 'user-login', component: UserLoginComponent},
  {path: 'user-feed', component: UserFeedComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
