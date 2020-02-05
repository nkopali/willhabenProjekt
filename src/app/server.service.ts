import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable()
export class ServerService {
  baseurl = 'http://localhost:3000/';
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

  showEventFeed(data) {
    return this.http.get(this.baseurl + 'feed', this.httpOptions);
  }

  createEvent(data) {
    return this.http.post(this.baseurl + 'feed', data, this.httpOptions);
  }

  updateEvent(data) {
    return this.http.put(this.baseurl + 'feed', data, this.httpOptions);
  }

}