import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ServerService} from '../server.service';
declare var H: any;
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddPostComponent implements OnInit {
  private username:any;
  private searchText: string;

  constructor(private router: Router, private serverService: ServerService) {
  }

  ngOnInit() {
  }

  createPost(subject: string, descrip: string, category: string, location: string) {
    this.username = localStorage.getItem('userID');

    const platform = new H.service.Platform({
      apikey: 'eWkBgZBzvJVTsr8jxFWQb6DdbA84TQn_yfxynvj8CUY'
    });
    const geocodingParams = {
      searchText: location,
    };
    const onResult = (result) => {
      const locations = result.Response.View[0].Result;
      let position;
      // Add a marker for each location found
      for (let i = 0; i < locations.length; i++) {
        position = {
          lat: locations[i].Location.DisplayPosition.Latitude,
          lng: locations[i].Location.DisplayPosition.Longitude
        };
      }
      const data = {
        userID: this.username,
        subject,
        descrip,
        category,
        latitude: position.lat,                                  // !!!!!!!!!!!!!!!!!!!!!!!!! add coordinates
        longitude: position.lng
      };

      this.serverService.createEvent(data).subscribe((data) => {
        console.log(data);
      });
    };
    const geocoder = platform.getGeocodingService();
    geocoder.geocode(geocodingParams, onResult, (e) => {
      alert(e);
    });
    this.router.navigate(['/home/user-feed']);

  }

  searchFeed(searchText: string) {
    localStorage.setItem('searchInput', searchText);
    this.router.navigate(['/home/search-feed']);
  }

  clearCache() {
    localStorage.clear();
    console.log('Cache cleared');
    this.router.navigate(['/home/user-login']);
  }

}
