import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ServerService} from '../server.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})

export class MyPostComponent implements OnInit {
  private db: Object;
  location: string;
  private searchText: string;
  userID: string;
  private temp: any;
  private size: number = 0;
  private smth: any[];

  constructor(private router: Router, private serverService: ServerService) { }

  ngOnInit() {
    this.userID = localStorage.getItem("userID")


    this.serverService.showEventFeed(this.userID).subscribe(data =>{
        this.temp = data;
        var posts = this.temp.filter((post)=>{
          if(post.userid.toString() === this.userID){
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

  modify(itemid : any) {
    localStorage.setItem("itemID",itemid.toString())
    this.router.navigate(['/modify'])

  }
}
