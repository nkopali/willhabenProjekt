import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnInit {
  private db: any;
  location: string;
  private searchText: string;
  userID: string;

  constructor(private router: Router, private serverService: ServerService) { }

  ngOnInit() {
    this.userID = localStorage.getItem("userID")


    this.serverService.showEventFeed(this.userID).subscribe(data =>{
      this.db = data;
    })

  }

  addPost(){
    this.router.navigate(['/add-post'])
  }
  clearCache(){
    localStorage.clear();
    console.log("Cache cleared");
    this.router.navigate(['/user-login']);
  }

  printUsr() {
    console.log(localStorage.getItem("userID"))
  }

}
