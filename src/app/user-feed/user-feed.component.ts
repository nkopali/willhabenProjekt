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
  private test: string;
  private searchText: string;

  constructor(private router: Router, private serverService: ServerService) { }

  ngOnInit() {

    this.serverService.showEventFeed(this.test).subscribe(data =>{
      this.db = data;
      this.test = localStorage.getItem("userID")
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

    localStorage.setItem("searchInput", searchText);
    this.router.navigate(['/search-feed'])

  }
}
