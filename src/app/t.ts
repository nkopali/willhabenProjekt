import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.url.includes('login') && !request.url.includes('register')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    }
    let r = next.handle(request);
    r.subscribe((t) => t, (t) => {

      if (t && t.status === 401) {
        localStorage.removeItem('UserLoggedIn');
        localStorage.removeItem('userID');
        localStorage.removeItem('token');
        this.router.navigate(['/user-login']);
        setTimeout(() => alert('Not authorized'), 500);
      }
      return t;
    });
    console.log(r);
    return r;
  }
}
