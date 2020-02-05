import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ServerService} from '../server.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})

export class ModifyComponent implements OnInit {
  private db: Object;
  location: string;
  private searchText: string;
  userID: string;
  private temp: any;
  private itemID: string;
  private latitude: any;
  private longtitude: any;

  constructor(private router: Router, private serverService: ServerService) { }

  ngOnInit() {
    this.userID = localStorage.getItem("userID");
    this.itemID = localStorage.getItem("itemID")


    this.serverService.showEventFeed(this.userID).subscribe(data =>{
      this.temp = data;
      var posts = this.temp.filter((post)=>{
        if(post.userid.toString() === this.userID && post.itemID.toString() === this.itemID){
          return post
        }
      })
      this.db = posts
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


  printUsr() {
    console.log(localStorage.getItem("userID"))
  }


  save(subject: string, description: string, category: string) {
    this.latitude = "idk"
    this.longtitude = "idk2"

    const data = {
      eventID : this.itemID,
      subject : subject,
      descrip : description,
      category :category,
      latitude : this.latitude,
      longitude : this.longtitude

    };
    this.serverService.updateEvent(data).subscribe(data =>{
      console.log(data)
    })
  }
}
