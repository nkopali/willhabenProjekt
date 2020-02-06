import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('UserLoggedIn') === 'UserLoggedIn') { //check if user already logged on
      //this.router.navigate(['/user-feed']);
      console.log('User logged in');
      return true;
    } else {
      console.log('not accepted');
      this.router.navigate(['/user-login']);//if he is not redirect to /user-login
      return false;
    }
  }

}
