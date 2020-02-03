import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServerService} from '../server.service';

@Component({
  selector: 'app-search-feed',
  templateUrl: './search-feed.component.html',
  styleUrls: ['./search-feed.component.css']
})
export class SearchFeedComponent implements OnInit {
  private searchText: string;
  constructor(private router: Router, private serverService: ServerService) { }

  ngOnInit() {
    this.searchText = localStorage.getItem("searchInput")
    console.log(this.searchText)
    localStorage.removeItem("searchInput")

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
