import {NgModule} from '@angular/core';
import {UserLoginComponent} from './user-login/user-login.component';
import {RouterModule, Routes} from '@angular/router';
import {UserFeedComponent} from './user-feed/user-feed.component';
import {AuthGuard} from './auth.guard';
import {UserSignupComponent} from './user-signup/user-signup.component';
import {MapComponent} from './map/map.component';

const routes: Routes = [
  {path: '', redirectTo: '/user-feed', pathMatch: 'full'}, //default page
  {path: 'user-login', component: UserLoginComponent},
  {path: 'user-signup', component: UserSignupComponent},
  {path: 'user-feed', component: UserFeedComponent, canActivate: [AuthGuard]},
  {path: 'map', component: MapComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
