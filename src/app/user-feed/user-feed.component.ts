import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {data, posts} from '../MockDataBase';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css']
})
export class UserFeedComponent implements OnInit {
  private db: any[];
  private latitute: any;
  private longitude: any;
  location: string;

  constructor(private router: Router, private serverService: ServerService) { }

  ngOnInit() {
    this.db = posts;
    this.serverService.showEventFeed(data=>{
      this.db = data;
      //latitute = this.db.latitude;
      //longitude = this.db.longitude;
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

  searchFeed(searchText:string){
    localStorage.setItem("searchInput", searchText)
    this.router.navigate(['/search-feed'])

  }
}
