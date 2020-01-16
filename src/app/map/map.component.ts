import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  private platform: any;

  @ViewChild('map', {static: false})
  public mapElement: ElementRef;

  public constructor() {
    this.platform = new H.service.Platform({
      apikey: 'eWkBgZBzvJVTsr8jxFWQb6DdbA84TQn_yfxynvj8CUY'
    });
  }

  public ngOnInit() {
  }

  public ngAfterViewInit() {
    const defaultLayers = this.platform.createDefaultLayers();
    console.log(defaultLayers);
    const map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.raster.normal.map,
      {
        zoom: 10,
        center: {lat: 37.7397, lng: -121.4252}
      }
    );
    console.log(H);

    // Create the default UI:
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    
    // add marker to map
    const geocodingParams = {
      searchText: 'Neptunweg 3, 9020 Klagenfurt, Austria',
    };
    const onResult = (result) => {
      const locations = result.Response.View[0].Result;
      let position;
      let marker;
      // Add a marker for each location found
      for (let i = 0; i < locations.length; i++) {
        position = {
          lat: locations[i].Location.DisplayPosition.Latitude,
          lng: locations[i].Location.DisplayPosition.Longitude
        };
        marker = new H.map.Marker(position);
        map.addObject(marker);
        map.setCenter(position);
        console.log(position);
      }
    };
    const geocoder = this.platform.getGeocodingService();
    geocoder.geocode(geocodingParams, onResult, (e) => {
      alert(e);
    });
  }
}
