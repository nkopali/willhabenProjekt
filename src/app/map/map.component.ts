import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServerService} from '../server.service';

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

  public constructor(private serverService: ServerService) {
    this.platform = new H.service.Platform({
      apikey: 'eWkBgZBzvJVTsr8jxFWQb6DdbA84TQn_yfxynvj8CUY'
    });
  }

  public ngOnInit() {
  }

  public ngAfterViewInit() {
   this.setMarkers();
  }


  async setMarkers() {
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
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    const locations = await this.serverService.getLocations();
    let position;
    let marker;
    // Add a marker for each location found
    for (let i = 0; i < locations.length; i++) {
      position = {
        lat: locations[i].latitude,
        lng: locations[i].longitude
      };
      marker = new H.map.Marker(position);
      map.addObject(marker);
      map.setCenter(position);
      console.log(position);
    }
  }
}
