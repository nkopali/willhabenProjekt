import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {posts} from '../MockDataBase';
import {ServerService} from '../server.service';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserFeedComponent implements OnInit {
  private db: any[];
  private latitute: any;
  private longitude: any;
  location: string;
  private test: string;
  private searchText: string;
  userID: string;

  constructor(private router: Router, private serverService: ServerService) {
  }

  ngOnInit() {
    this.userID = localStorage.getItem('userID');

    console.log(this.test);


    this.db = posts;
    this.serverService.showEventFeed().then((data: any[]) => {
      this.db = data;
    });

  }

  addPost() {
    this.router.navigate(['/home/add-post']);
  }

  addLike(id: any) {
    this.serverService.updateLikes(id, ++this.db.find(item => item.itemID === id).likes);
  }

}
