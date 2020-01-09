import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {posts} from '../MockDataBase';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnInit {
  private db: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.db = posts;
  }

  addLike(id : any){
    this.db[id].likes++;
  }

  clearCache(){
    localStorage.removeItem("UserLoggedIn");
    console.log("Cache cleared");
    this.router.navigate(['/user-login']);
  }

}
