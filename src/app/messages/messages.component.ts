import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Message} from './Message';
import {ServerService} from '../server.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MessagesComponent implements OnInit, OnDestroy {
  messages: Message[];
  messagesToShow: Message[] = [];
  users: any[];
  messageToSend: string;
  interval;
  newM: string[] = [];

  clickedUser;

  constructor(private serverService: ServerService) {

  }

  ngOnInit() {

    this.loadUsers();


    this.loadMessages();

    this.interval = setInterval(
      () => this.loadMessages(), 5000
    );
  }

  async loadUsers() {
    this.users = (await this.serverService.getAllUsers()).map(user => ({name: user.username, id: user.userID}))
      .reduce((p: any[], c: any) => {
        if (!p.find(u => u.id + '' === c.id + '') && c.id + '' !== localStorage.getItem('userID') + '') {
          p.push(c);
        }
        return p;
      }, []);
  }

  async loadMessages() {
    const oldM = (this.messages || []).slice();

    const ms = await this.serverService.getMessages();


    this.messages = ms as Message[];
    if (this.messages.length === 0) {
      return;
    }
    this.loadUsers();

    this.messages.forEach(oM => {
      if (this.messages.filter(m => m.senderID + '' === oM.senderID + '').length > oldM.filter(m => m.senderID + '' === oM.senderID + '').length) {
        if (this.newM.indexOf(oM.senderID) < 0) {
          this.newM.push(oM.senderID);
        }
      }
    });

    if (this.clickedUser) {
      this.userClicked(this.clickedUser);
    }

  }

  userClicked(id: string) {
    this.clickedUser = id;
    this.messagesToShow = this.messages.filter(m => m.senderID === id || m.receiverID === id).map((m: Message) => {
      m.other = m.senderID === id;
      return m;
    });
    this.newM = this.newM.filter(m => m !== id);
    if (this.messagesToShow.length === 0) {
      this.messagesToShow.push({
        text: 'Starte einen neuen Chat',
        timestamp: new Date(),
        senderName: this.users.find(u => u.id === localStorage.getItem('userID')).name,
        receiverID: id,
        senderID: localStorage.getItem('userID')
      });
      this.messages.push({
        text: 'Starte einen neuen Chat',
        timestamp: new Date(),
        senderName: this.users.find(u => u.id === localStorage.getItem('userID')).name,
        receiverID: id,
        senderID: localStorage.getItem('userID')
      });
    }


  }


  sendMessage() {
    console.log('hää');
    this.serverService.sendMessage(this.messageToSend, this.clickedUser + '');
    this.messageToSend = '';
    this.loadMessages();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
