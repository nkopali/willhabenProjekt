import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServerService} from '../server.service';

@Component({
  selector: 'app-search-feed',
  templateUrl: './search-feed.component.html',
  styleUrls: ['./search-feed.component.css']
})
export class SearchFeedComponent implements OnInit {
  private db: object;
  location: string;
  private searchText: string;
  userID: string;
  private temp: any;
  private itemID: string;
  private latitude: any;
  private longtitude: any;

  constructor(private router: Router, private serverService: ServerService) {
  }

  ngOnInit() {
    this.userID = localStorage.getItem('userID');
    this.itemID = localStorage.getItem('itemID');


    this.serverService.showEventFeed().then((data: any[]) => {
      this.db = data.filter((post) => post.userid.toString() === this.userID && post.itemID.toString() === this.itemID);
    });

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


  save(subject: string, description: string, category: string) {

    const data = {
      eventID: this.itemID,
      userID: this.userID,
      subject,
      descrip: description,
      category

    };
    this.serverService.updateEvent(data).subscribe(data => {
      console.log(data);
      this.router.navigate(['/home/my-posts']);
    });
  }
}
