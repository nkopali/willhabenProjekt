import { NgModule } from '@angular/core';
import {UserLoginComponent} from './user-login/user-login.component';
import {RouterModule, Routes} from '@angular/router';
import {UserFeedComponent} from './user-feed/user-feed.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/user-login', pathMatch: 'full'},//default page
  {path: 'user-login', component: UserLoginComponent},
  {path:'user-feed', component:UserFeedComponent, canActivate:[AuthGuard]},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
