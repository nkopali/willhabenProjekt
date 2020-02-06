import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServerService} from '../server.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})

export class MyPostComponent implements OnInit {
  private db: object;
  location: string;
  private searchText: string;
  userID: string;
  private temp: any;
  private size: number = 0;
  private smth: any[];

  constructor(private router: Router, private serverService: ServerService) {
  }

  ngOnInit() {
    this.userID = localStorage.getItem('userID');


    this.serverService.showEventFeed().then((data: any []) =>
      this.db = data.filter((post) => post.userid.toString() === this.userID)
    );

  }

  addPost() {
    this.router.navigate(['/home/add-post']);
  }

  clearCache() {
    localStorage.clear();
    console.log('Cache cleared');
    this.router.navigate(['/user-login']);
  }

  printUsr() {
    console.log(localStorage.getItem('userID'));
  }

  modify(itemid: any) {
    localStorage.setItem('itemID', itemid.toString());
    this.router.navigate(['/home/modify']);

  }

  delete(itemID: any) {
    this.serverService.delete(itemID);
  }
}
