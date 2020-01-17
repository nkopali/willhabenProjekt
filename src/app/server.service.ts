import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable()
export class ServerService {
  baseurl = 'http://localhost:3306/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  };
  loggedIn = false;
  name: string;

  loggedInchanged = new Subject<Boolean>();     // creates a new observable

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post(this.baseurl + 'login', data, this.httpOptions);
  }

  register(data) {
    return this.http.post(this.baseurl + 'register', data, this.httpOptions);
  }

}
