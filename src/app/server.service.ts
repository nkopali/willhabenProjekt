import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable()
export class ServerService {
  baseurl = 'http://localhost:3000/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  loggedIn = false;
  name: string;

  loggedInchanged = new Subject<boolean>();     // creates a new observable

  constructor(private http: HttpClient) {
  }

  login(data) {
    return this.http.post(this.baseurl + 'login', data, this.httpOptions);
  }

  register(data) {
    return this.http.post(this.baseurl + 'register', data, this.httpOptions);
  }

  showEventFeed() {
    return this.http.get(this.baseurl + 'feed', this.httpOptions).toPromise();
  }

  createEvent(data) {
    return this.http.post(this.baseurl + 'feed', data, this.httpOptions);
  }

  updateEvent(data) {
    return this.http.put(this.baseurl + 'feed', data, this.httpOptions);
  }

  async getMessages() {
    return await this.http.get(`${this.baseurl}messages/${localStorage.getItem('userID')}`)
      .toPromise().then(messages => {
        if ((messages as any).message) {
          messages = [];
        }
        (messages as any[]).map(m => {
          m.timestamp = new Date(Date.parse(m.timestamp.toString()));
          return m;
        });
        return (messages as any[]).sort(((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
      });
  }

  sendMessage(messageToSend: string, receiverID: string) {
    console.log('doppel häää');
    console.log(messageToSend);
    console.log(receiverID);

    this.http.get(this.baseurl + 'feed', this.httpOptions);

    return this.http.post(`${this.baseurl}messages`, {
      text: messageToSend,
      senderID: localStorage.getItem('userID'),
      receiverID
    }, this.httpOptions).toPromise();
  }

  async getAllUsers() {
    return await this.http.get<any[]>(`${this.baseurl}messages/all`)
      .toPromise();
  }

  async getLocations() {
    return await this.http.get(this.baseurl + 'feed', this.httpOptions).toPromise()
      .then((results: any[]) => results.map(result => ({longitude: result.longitude, latitude: result.latitude})));
  }

  async updateLikes(id: any, param2: any) {
    return await this.http.post(this.baseurl + 'feed/likes', {
      eventID: id, likes: param2
    }, this.httpOptions).toPromise();
  }

  async delete(eventID: any) {
    return await this.http.delete(this.baseurl + 'feed/' + eventID, this.httpOptions).toPromise();
  }
}
