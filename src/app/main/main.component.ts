import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  title = 'Willhaben';
  items: MenuItem[];
  items2: MenuItem[];

  constructor(private router: Router) {
  }
  ngOnInit() {
    this.items = [
      {label: 'Home', icon: 'pi pi-home', routerLink: '/home/user-feed'},
      {label: 'Overview', icon: 'pi pi-map-marker', routerLink: '/home/map'},
      {label: 'Messages', icon: 'pi pi-comments', routerLink: '/home/messages'},
      {label: 'My events', icon: 'pi pi-edit', routerLink: '/home/my-post'},

    ];
    this.items2 = [
      {label: 'Logout', icon: '', command: () => this.clearCache(), style: 'float: right', id: 't'},
    ];
  }

  clearCache() {
    localStorage.removeItem('UserLoggedIn');
    console.log('Cache cleared');
    this.router.navigate(['/user-login']);
  }

  searchFeed(searchText: string) {
    localStorage.setItem('searchInput', searchText);
    this.router.navigate(['/home/search-feed']);

  }

}
