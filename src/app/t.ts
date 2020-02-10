import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.url.includes('login') && !request.url.includes('register')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error && error.status === 401) {
          localStorage.removeItem('UserLoggedIn');
          localStorage.removeItem('userID');
          localStorage.removeItem('token');
          this.router.navigate(['/user-login']);
          setTimeout(() => alert('Not authorized'), 500);
        }
        return throwError(error);
      }),
    );

  }
}

